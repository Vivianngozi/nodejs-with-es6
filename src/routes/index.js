import express from 'express';
const router = express.Router();
import {jwtValidator} from '../middleware/auth.js';
import ctrlPost from '../controllers/posts.js';
import ctrlComment from '../controllers/comment.js';
import ctrlAuth from '../controllers/authentication.js';




router.post('/blogs', jwtValidator, ctrlPost.postCreate);
router.get('/blogs', ctrlPost.postViewAll);
router.get('/blogs/:id', ctrlPost.potViewOne);
router.put('/blogs/:id', jwtValidator, ctrlPost.postUpdate);
router.delete('/blogs/:id', jwtValidator, ctrlPost.postDelete);


// comment
router.post('/blogs/:id/comment', jwtValidator, ctrlComment.commCreate);
router.get('/blogs/:id/comment', ctrlComment.commRead);
router.put('/blogs/:id/comment/:reviewid', jwtValidator, ctrlComment.commUpdate);
router.delete('/blogs/:id/comment/:reviewid', jwtValidator, ctrlComment.commDelete);

// register and login
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);


router.all('*', function(req, res){
    res.status(404).json({
        "message": "not found"
    });
  });


export { router };
