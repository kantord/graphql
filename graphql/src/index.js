import graphqlHTTP from 'express-graphql';
import Schema from './Schema';

exports.default = graphqlHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true,
  formatError(error) {
    console.error(error);
    return error;
  },
});
