const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
      type Query {
          message: String
    }`);

// Ci-dessous fonction resolver, c a d function
// qui va chercher la data dans la BDD
const root = {
  message: () => 'Hello World!',
};
const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000, () => console.log('Express is running on port 4000'));
