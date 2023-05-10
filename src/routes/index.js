import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';
import ctrlPost from '../controllers/posts.js';
import ctrlComment from '../controllers/comment.js';
import ctrlAuth from '../controllers/authentication.js';




router.post('/blogs', auth.create, ctrlPost.postCreate);
router.get('/blogs', ctrlPost.postViewAll);
router.get('/blogs/:id', ctrlPost.potViewOne);
router.put('/blogs/:id', auth.create, ctrlPost.postUpdate);
router.delete('/blogs/:id', auth.create, ctrlPost.postDelete);


// comment
router.post('/blogs/:id/comment', auth.create, ctrlComment.commCreate);
router.get('/blogs/:id/comment/:reviewid', ctrlComment.commRead);
router.put('/blogs/:id/comment/:reviewid', auth.create, ctrlComment.commUpdate);
router.delete('/blogs/:id/comment/:reviewid', auth.create, ctrlComment.commDelete);

// register and login
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);


router.all('*', function(req, res){
    res.status(404).json({
        "message": "not found"
    });
  });


export { router };
