const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

// resolvers
const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).populate('savedBooks');// find user by id and populate savedBooks
        return userData;
      }
      throw new AuthenticationError('Not logged in');// if user is not logged in throw error
    },
  },

  // 1. Add a login mutation that accepts an email and password as parameters and returns an Auth type.
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });// find user by email

      if (!user) {
        throw new AuthenticationError('Incorrect email or password');// if user does not exist throw error
      }

      const correctPw = await user.isCorrectPassword(password);// check if password is correct

      if (!correctPw) {
        throw new AuthenticationError('Incorrect email or password');// if password is incorrect throw error
      }

      const token = signToken(user);// sign token

      return { token, user };// return token and user
    },
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });// create user
      const token = signToken(user);

      return { token, user };// return token and user
    },
    // save book
    saveBook: async (_, { input }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: input } },// add book to savedBooks
          { new: true }
        ).populate('savedBooks');

        return updatedUser;// return updated user
      }
      throw new AuthenticationError('You need to be logged in to save a book');// if user is not logged in throw error
    },
    // remove book
    removeBook: async (_, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },// remove book from savedBooks
          { new: true }
        ).populate('savedBooks');// populate savedBooks

        return updatedUser;// return updated user
      }
      throw new AuthenticationError('You need to be logged in to remove a book');// if user is not logged in throw error
    },
  },
};

module.exports = resolvers;
