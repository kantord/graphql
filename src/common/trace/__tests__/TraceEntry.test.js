import { flattenTree, toTypedKeyValue } from '../TraceEntry';

const objTests = [
  {
    name: 'single pair',
    input: {
      fieldName: 'foo',
    },
    output: [
      {
        name: 'fieldName',
        stringValue: 'foo',
      },
    ],
  },
  {
    name: 'single pair 2',
    input: {
      fieldName2: 'foo',
    },
    output: [
      {
        name: 'fieldName2',
        stringValue: 'foo',
      },
    ],
  },
  {
    name: 'multiple pairs',
    input: {
      fieldName2: 'foo',
      fieldName3: 'foo2',
    },
    output: [
      {
        name: 'fieldName2',
        stringValue: 'foo',
      },
      {
        name: 'fieldName3',
        stringValue: 'foo2',
      },
    ],
  },
  {
    name: 'parent/child with arrays',
    input: {
      fieldName2: {
        someValue: 'hello',
        someArray: ['foo', 5.5],
      },
    },
    output: [
      {
        name: 'fieldName2',
        children: [
          {
            name: 'someValue',
            stringValue: 'hello',
          },
          {
            name: 'someArray',
            arrayValue: [
              {
                stringValue: 'foo',
              },
              {
                floatValue: 5.5,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'parent/child',
    input: {
      fieldName: 'foo',
      whatever: {
        fieldName: 'bar',
        fieldValue: 'athing',
      },
    },
    output: [
      {
        name: 'fieldName',
        stringValue: 'foo',
      },
      {
        name: 'whatever',
        children: [
          {
            name: 'fieldName',
            stringValue: 'bar',
          },
          {
            name: 'fieldValue',
            stringValue: 'athing',
          },
        ],
      },
    ],
  },
];

const typeTests = [
  {
    name: 'integer',
    input: 55,
    output: {
      integerValue: 55,
    },
  },
  {
    name: 'float',
    input: 5.5,
    output: {
      floatValue: 5.5,
    },
  },
  {
    name: 'float 2',
    input: 5.55,
    output: {
      floatValue: 5.55,
    },
  },
  {
    name: 'bool',
    input: true,
    output: {
      booleanValue: true,
    },
  },
  {
    name: 'bool 2',
    input: false,
    output: {
      booleanValue: false,
    },
  },
  {
    name: 'array',
    input: [1],
    output: {
      arrayValue: [
        {
          integerValue: 1,
        },
      ],
    },
  },
  {
    name: 'array',
    input: [1, 'two'],
    output: {
      arrayValue: [
        {
          integerValue: 1,
        },
        {
          stringValue: 'two',
        },
      ],
    },
  },
];

describe('flattenTree', () => {
  objTests.forEach(test =>
    it(test.name, () => {
      const entry = flattenTree(test.input);
      expect(entry).toEqual(test.output);
    }),
  );
  typeTests.forEach(test =>
    it(test.name, () => {
      const entry = toTypedKeyValue(test.input);
      expect(entry).toEqual(test.output);
    }),
  );
});
// it('should flatten tree hierarchy', () => {
//   const entry = TraceEntry.flattenTree({
//     fieldName: 'foo',
//     whatever: {
//       fieldName: 'bar',
//       fieldValue: 'athing',
//     }
//   })
//   expect(entry).toBe([
//     {
//       name: 'fieldName',
//       stringValue: 'foo'
//     },
//     {
//       name: 'whatever',
//     },
//     {
//       path: ['whatever'],
//       name: 'fieldName',
//       stringValue: 'bar',
//     },
//     {
//       path: ['whatever'],
//       name: 'fieldValue',
//       stringValue: 'athing',
//     },
//
//   ])
// })
