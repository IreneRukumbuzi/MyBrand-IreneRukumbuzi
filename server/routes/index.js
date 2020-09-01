import express from 'express';
import passport from 'passport';
import blogsController from '../controllers/blogs';
import queriesController from '../controllers/queries';
import userController from '../controllers/user';
import validatorUser from '../middleware/validations/user_valid';
import queryValidator from '../middleware/validations/query_valid';
import authValid from '../middleware/validations/isAuth';
import blogsValidator from '../middleware/validations/blog_valid';
import commentValidator from '../middleware/validations/commentValid';

const router = express.Router();

router.get('/', userController.landingMessage);
router.get('/blogs', blogsController.getBlogs);
router.get('/blogs/:id', blogsController.getSpecificBlog);
router.delete('/blogs/:id', authValid.verifyToken, blogsController.delete);
router.patch('/blogs/:id', authValid.verifyToken, blogsController.updateBlog);
router.post('/blogs/comments/:id', commentValidator.commentValidator, blogsController.comments);
router.get('/blogs/comments/:id', blogsController.getComments);
router.post('/blogs/likes/:id', blogsController.likes);
router.get('/queries', authValid.verifyToken, queriesController.storeQueries);
router.get('/queries/:id', authValid.verifyToken, queriesController.getOneQuery);
router.post('/queries', queryValidator.validator, queriesController.createQuery);
router.post('/blogs', authValid.verifyToken, blogsValidator.blogValidator, blogsController.createBlog);
router.post('/login', validatorUser.validator, passport.authenticate('local'), userController.pass);

router.get('/logout', (req, res) => {
  req.logOut();
  res.send({ message: 'Logged out successfully' });
});

router.use('/*', (req, res) => {
  res.status(405).send({ message: 'method not allowed' });
});

export default router;
