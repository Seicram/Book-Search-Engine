// server.js

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const authMiddleware = require('./middleware/auth');

const app = express();

// Apply the auth middleware to every request
app.use(authMiddleware);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Pass the request object and user context to the Apollo Server
    return { user: req.user };
  },
});

// Apply Apollo Server as middleware to Express
server.applyMiddleware({ app });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

