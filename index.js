const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const { resolvers, typeDefs } = require("./schema");
const { categories } = require("./db.json");

const PORT = process.env.PORT || 3500;
const app = express();

app.use(cors());

require("./adapter");

const server = new ApolloServer({
  introspection: true, // do this only for dev purposes
  playground: true, // do this only for dev purposes
  typeDefs,
  resolvers,
  context: () => {}, // Empty context
});

async function startServer() {
  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });

  app.get("/categories", function (req, res) {
    res.send(categories);
  });

  app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((error) => {
  console.error("Error al iniciar el servidor:", error);
  process.exit(1);
});

module.exports = app;
