const Posts = require('../database/posts.model');

const getPosts = async () => {
  try {
      const result = await Posts.find();
      return result;
    } catch (err) {
      throw new Error(err);
    }
}

const getPostById = async (postId) => {
  try {
      const result = await Posts.findOne({_id: postId});
      return result;
    } catch (err) {
      throw new Error(err);
    }
}

const createPostsService = async (title, description, tags, status, fullname, email) => {
  try {
    const newPosts = new Posts({
      title,
      description,
      username: fullname,
      email,
      tags,
      status
    });
    const result = await newPosts.save();
    return result
  } catch (err) {
    throw new Error(err);
  }
}

const updatePostsService = async (postId, comment, status, voters, fullname, email) => {
  try { 
    const post = await Posts.findOne({_id: postId});
    if (!post) {
      throw new Error('Post not found');
    }
    
    if (comment) {
      post.comments.push({
        username: fullname,
        email,
        comment: comment,
      });
    }
    
    if (voters) {
      post.voters = voters;
    }
    
    if (status) {
      post.history.push({
        username: fullname,
        email,
        status: post.status,
        updatedAt: Date.now()
      });
      post.status = status;
    }
    
    const updatedPost = await post.save();
    return updatedPost;
  } catch (err) {
    throw new Error(err);
  }
}


const deletePostService = async (postId) => {
  try {
      const result = await Posts.deleteOne({_id: postId});
      return result;
    } catch (err) {
      throw new Error(err);
    }
}

module.exports = {getPosts, getPostById, createPostsService, deletePostService, updatePostsService};