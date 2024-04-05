const mongoose = require('mongoose');

const comments = new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
  });

const history = new mongoose.Schema({
username: {
    type: String,
    required: true
},
email: {
    type: String,
    required: true
},
status: {
    type: String,
    required: true
},
updatedAt: {
    type: Date,
    default: Date.now()
}
});

// Define a schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
    description: {
        type: String,
        required: true
      },
    username: {
        type: String,
        required: true
      },
    email: {
        type: String,
        required: true
      },
    tags: {
        type: [String]
      },
    comments: {
      type: [comments],
      default: []
    },
    status: String,
    voters: [String],
    history: {
      type: [history],
      default: []
    },
    created_at: {
        type: Date,
        default: Date.now()
      }
});

// Define a model
const Posts = mongoose.model('post', postSchema);

module.exports = Posts;
