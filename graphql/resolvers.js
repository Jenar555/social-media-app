const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');


const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.find();
    },
    getUser: async (_, { id }) => {
      return await User.findById(id);
    },
    getPosts: async () => {
      return await Post.find();
    },
    getPost: async (_, { id }) => {
      return await Post.findById(id);
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password, fullName }) => {
      return await User.create({ username, email, password, fullName });
    },
    createPost: async (_, { userId, caption }) => {
      return await Post.create({ user: userId, caption });
    },
    createComment: async (_, { postId, userId, text }) => {
      return await Comment.create({ user: userId, post: postId, text });
    },
  },
};

module.exports = resolvers;
