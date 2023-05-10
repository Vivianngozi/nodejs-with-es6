import mongoose from 'mongoose';
import Blog from '../models/blog.js';
import User from '../models/user.js';



export default {

    async postCreate (req, res){
         try {
            if(User.findById(req.user.id)){
                const post = await Blog.create({
                    title: req.body.title,
                    subtitle: req.body.subtitle,
                    content: req.body.content
                })
                res.status(201).json(post);
            }
            
        } catch (error) {

            console.log(error);
            res.status(401).json({message: error.message})
        }

    },

    // get all post
    async postViewAll (req, res){
        try {
            const post = await Blog.find();
            return res.status(200).json(post);
        } catch(err) {
            res.status(401).json(err)
        }
    },
    async potViewOne (req, res){
       try {
        const post = await Blog.findOne({_id: req.params.id});
        if(post){
            return res.status(200).json(post);
        } 
        else {
            return res.status(404).json({
                "message" : "Blog not found"
            });
        }
       } catch (error) {
        res.status(400).json({"message": "blog does not exist"})
       }

    },

    // update post
    async postUpdate (req, res){
        try {
            let post = {
                title: req.body.title,
                subtitle: req.body.subtitle,
                content: req.body.content
            };
            const updatePost = await Blog.findOneAndUpdate({_id: req.params.id}, post, {new: true});
            if(updatePost) {
                return res.status(200).json(updatePost);
            } else {
                return res.status(404).json({
                    "message": "not found"
                });
            }
        } catch(err){
            res.status(500).json(err);
        }
    },

    // delete
    async postDelete (req, res){
        try {
            const deletePost = await Blog.findByIdAndRemove(req.params.id);
            if (deletePost){
                return res.status(204).json(null);
            } else{
                res.status(404).json({
                    "message": "Not found"
                })
            }
        } catch(err){
            res.status(400).json(err);
        }
    },



}

