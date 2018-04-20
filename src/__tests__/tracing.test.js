// @flow

import request from 'supertest';
import server from '../graphqlServer';
import fs from 'fs'
import path from 'path'

const load_query = fname => ({query: fs.readFileSync(path.join(__dirname, fname)).toString()})

beforeEach(() => {
  require.requireMock('apollo-tracing').formatTraceData
    .mockReturnValue(require('./fixtures/trace_data_1.js').default)
})

const original_env = process.env.NODE_ENV
afterEach(() => {
   process.env.NODE_ENV = original_env;
});

afterEach(() => {
  jest.resetAllMocks();
});


jest.mock('uuid/v4', () => () => 'foobar')
jest.mock('../common/trace/TraceEntry', () => jest.fn())
jest.mock('apollo-tracing', () => ({
  formatTraceData: jest.fn(),
  instrumentSchemaForTracing:
    require.requireActual('apollo-tracing').instrumentSchemaForTracing,
  TraceCollector: require.requireActual('apollo-tracing').TraceCollector
}))

jest.mock('elasticsearch', () => {
  const elastic_create = jest.fn(() => null)

  return {
    'Client': function() {
      return {
        'create': elastic_create
      }
    },
    '_create': elastic_create
  }
})

jest.mock('../common/services/JsonFetcher', () => {
  return {
    'fetchJson': async () => {
      return require('../flight/datasets/no-results.json')
    }
  }
})

const query = load_query('./fixtures/query_1.txt')

it('calls elastic.create with an object', async () => {
  process.env.NODE_ENV = 'tracing-test'
  const elastic = {'create': require.requireMock('elasticsearch')._create};
  const uuid = require.requireMock('uuid/v4');
  const response = await request(server)
    .post('/')
    .send(query);
  expect(elastic.create).toHaveBeenCalledWith({
    index: expect.anything(),
    type: expect.anything(),
    id: uuid(),
    body: expect.anything()
  })
})

it('passes a uuid to elastic.create', async () => {
  process.env.NODE_ENV = 'tracing-test'
  const elastic = {'create': require.requireMock('elasticsearch')._create}
  const response = await request(server)
    .post('/')
    .send(query);
  expect(elastic.create).toHaveBeenCalledWith({
    index: expect.anything(),
    type: 'query',
    id: expect.anything(),
    body: expect.anything()
  })
})

it('flattenTree called', async () => {
  process.env.NODE_ENV = 'tracing-test'
  const elastic = {'create': require.requireMock('elasticsearch')._create}
  const flattenTree = require.requireMock('../common/trace/TraceEntry')
  const response = await request(server)
    .post('/')
    .send(query);
  expect(flattenTree).toHaveBeenCalledWith(expect.any(Array))
});

['foo', 6].forEach(flattenTree_return_value =>
  it('body has a flattened defintions attribute', async () => {
    process.env.NODE_ENV = 'tracing-test'
    const elastic = {'create': require.requireMock('elasticsearch')._create}
    const flattenTree = require.requireMock('../common/trace/TraceEntry')
    flattenTree.mockReturnValue(flattenTree_return_value)
    const response = await request(server)
      .post('/')
      .send(query);
    expect(elastic.create).toHaveBeenCalledWith({
      index: expect.anything(),
      type: expect.anything(),
      id: expect.anything(),
      body: {
        'request': {
          'definitions': flattenTree_return_value,
          'results': expect.anything()
        }
      }
    })
  })
)

const traceDataObjects = [
  [load_query('./fixtures/query_1.txt'), require('./fixtures/trace_data_1.js').default],
  [load_query('./fixtures/query_2.txt'), require('./fixtures/trace_data_2.js').default],
]

traceDataObjects.forEach(([query, {request_data}]) => {
  it('formats defintions using flattenTree', async () => {
    process.env.NODE_ENV = 'tracing-test'
    const elastic = {'create': require.requireMock('elasticsearch')._create}
    const flattenTree = require.requireMock('../common/trace/TraceEntry')
    const _ = x => JSON.parse(JSON.stringify(x))
    const response = await request(server)
      .post('/')
      .send(query);

    expect(_(flattenTree.mock.calls[0][0]))
      .toEqual(_(request_data[0].definitions))
  });
})
