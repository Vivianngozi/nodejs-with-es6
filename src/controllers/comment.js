import mongoose from 'mongoose';
import Blog from '../models/blog.js';

export default{
    async commCreate (req, res){
        try{
            const com = await Blog.findById({_id:req.params.id});
        if(com){
            // const post = 
            com.reviews.unshift({
                author: req.body.author,
                text: req.body.text
            });       
            await com.save().then(()=>{
                    res.status(200).json(com.reviews);

                }).catch((err)=>{
                    res.status(404).json(err);
                })
            
              
        } else{
            res.status(404).json({
                "message": "not found"
            });
            return;
        }
        }catch(err){
            res.json(err);
        }
    },

    // read comments
    async commRead (req, res){
        try {

            const post = await Blog.findOne({_id: req.params.id});
        if(!req.params.id || !req.params.reviewid || !post){
            return res.status(404).json({
                "message" : "not found"
            })
            return;
        }
        
        if(req.params && req.params.id && req.params.reviewid) {
            
        
            await Blog.findById(req.params.id).then((blog)=>{
                let doc= blog.reviews.id(req.params.reviewid);
                console.log(doc);
                return res.status(400).json(doc);
            }).catch((err)=>{
                res.status(400).json(err)
            });
        } else {
            return res.status(404).json({
                "message" : "not found"
            });
            return;
        }
            
        } catch (error) {
            res.status(400).json(error);
        }
        
        
    },


    // update comment
    async commUpdate (req, res){
        try {
            const com = await Blog.findById({_id:req.params.id});
            if(!req.params.id || !req.params.reviewid || !com){
                res.status(404).json({
                    "message" : "id not fount"
                });
                return;
            }
            
            if (com.reviews && com.reviews.length > 0 ){
                let theReview = com.reviews.id(req.params.reviewid);
                if(!theReview){
                    res.status(404).json({
                        "message" : "review id not found"
                    });

                }else {
                    theReview.author = req.body.author;
                    theReview.text = req.body.text;
                    
                    await com.save(theReview).then(()=>{
                        console.log(theReview);
                        res.status(200).json(theReview);
                    }).catch((err)=>{
                        console.log(err);
                        res.status(400).json(err);
                    });
                    
                    
                }
               
            }
            
        } catch (error) {
            console.log(error);
            res.status(403).json(error);
        }
    },

    // delete
    async commDelete(req, res){
        try {
            const com = await Blog.findById({_id: req.params.id});
        if(!req.params.id || !req.params.reviewid || !com){
            res.status(404).json({
                "message" : "not found"
            });
            return;
        }

        if(com.reviews && com.reviews.length > 0){
            const post = com.reviews.id(req.params.reviewid);
            if(!post){
                res.status(404).json({
                    "message": "review does not exist"
                });
                return;
            } else{
                await com.reviews.id(req.params.reviewid).deleteOne();
                await com.save().then(()=>{
                    res.status(204).json(null);
                }).catch((error)=>{
                    res.status(400).json(error);
                });
            }
        }
        } catch (error) {
            res.status(400).json(error)
        }
        
    }
}

