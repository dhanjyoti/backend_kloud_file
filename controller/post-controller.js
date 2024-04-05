const {getPosts, getPostById, createPostsService, deletePostService, updatePostsService} = require('../services/post-service')

const getAllPosts = async (req, res, next) => {
    try{
        const result = await getPosts();
        res.status(200).json(result);
    }catch(e){
        next(e)
    }
}

const getSinglePost = async (req, res, next) => {
    try{
        const id = req.params.id;
        const result = await getPostById(id);
        res.status(200).json(result);
    }catch(e){
        next(e)
    }
}

const createPost = async (req, res, next) => {
    try{
        const {title, description, tags, status} = req.body;
        const {fullname, email} = req.user;
        const result = await createPostsService(title, description, tags, status, fullname, email);
        res.status(201).json(result);
    }catch(e){
        next(e)
    }
}

const updatePost = async (req, res, next) => {
    try{
        const {postId, comment, status, voters} = req.body;
        const {fullname, email} = req.user;
        const result = await updatePostsService(postId, comment, status, voters, fullname, email);
        res.status(201).json(result);
    }catch(e){
        next(e)
    }
}

const deletePost = async (req, res, next) => {
    try{
        const id = req.params.id;
        const result = await deletePostService(id);
        res.status(200).json(result);
    }catch(e){
        next(e)
    }
}

module.exports = {getAllPosts, getSinglePost, createPost, deletePost, updatePost}