import express from 'express';
import passport from 'passport';
import validatorUser from '../middlewares/validations/user_valid';
import blogsController from '../controllers/blogs';
import queriesController from '../controllers/queries';
import queryValidator from '../middlewares/validations/query_valid';
import authValid from '../middlewares/validations/isAuth';
import blogsValidator from '../middlewares/validations/blog_valid';
import commentValidator from '../middlewares/validations/commentValid';

const router = express.Router();

router.get('/blogs', blogsController.getBlogs);
router.get('/blogs/:id', blogsController.getSpecificBlog);
router.delete('/blogs/:id', authValid.verifyToken, blogsController.delete);
router.patch('/blogs/:id', authValid.verifyToken, blogsController.updateBlog);
router.post('/blogs/comments/:id', commentValidator.commentValidator, blogsController.comments);
router.post('/blogs/likes/:id', blogsController.likes);
router.get('/queries', authValid.verifyToken, queriesController.storeQueries);
router.get('/queries/:id', authValid.verifyToken, queriesController.getOneQuery);
router.post('/queries', queryValidator.validator, queriesController.createQuery);
router.post('/blogs', authValid.verifyToken, blogsValidator.blogValidator, blogsController.createBlog);
router.post('/login', validatorUser.validator, passport.authenticate('local'), authValid.pass);

router.get('/logout', (req, res) => {
  req.logout();
  res.send('logged out successfully');
});

export default router;
