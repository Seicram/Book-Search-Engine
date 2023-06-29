// auth.js

const { AuthenticationError } = require('apollo-server-express');
const { verifyToken } = require('../utils/auth');

const authMiddleware = (context) => {
  // Get the token from the request headers
  const token = context.req.headers.authorization;

  if (token) {
    try {
      // Verify and decode the token
      const user = verifyToken(token);

      // Attach the authenticated user to the context object
      context.user = user;
    } catch (err) {
      throw new AuthenticationError('Invalid/Expired token');
    }
  } else {
    throw new AuthenticationError('Authentication token must be provided');
  }

  return context;
};

module.exports = authMiddleware;
