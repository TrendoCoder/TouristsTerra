const mongoose = require('mongoose');

// Define the Blog schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  userId:{
    type: String
  },
  imageURL:{
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  authorName:{
    type: String,
    required: false
  },
  likes: {
    type: Array,
    default: [],
  },
  comments: [
    {
      comment: {
        type: String,
        required: false,
      },
      author: {
        type: String,
        required: false,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      name: {
        type: String,
        required: false,
      },
      pic:{
        type: String,
      }
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;
