const express = require('express');
const { getAllPosts, getSinglePost, createPost, deletePost, updatePost } = require('./post-controller')
const authenticateToken = require('../middlewares/auth-middleware');
const { registerUser, loginUser } = require('./user-controller');

const router = express.Router();

router.get('/posts', authenticateToken, getAllPosts);
router.get('/posts/:id', authenticateToken, getSinglePost);
router.post('/posts', authenticateToken, createPost);
router.patch('/posts', authenticateToken, updatePost);
router.delete('/posts/:id', authenticateToken, deletePost);
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;