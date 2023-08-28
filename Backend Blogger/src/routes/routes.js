/* eslint-disable no-undef */
const { createBlog, getBlogs, updateBlog, deleteBlog } = require('../controllers/blogController');
const { userCreate, userLogin } = require('../controllers/userController');
const { authCheck } = require('../middleware/auth');
const router = require('express').Router();

router.get('/test', (req, res) => {
    res.send('test')
})

router.post('/register', userCreate)
router.post('/login', userLogin)


router.post('/createBlog', authCheck, createBlog)
router.get('/getBlogs', authCheck, getBlogs)
router.put('/updateBlog', authCheck, updateBlog)
router.delete('/deleteBlog', authCheck, deleteBlog)


module.exports = router;

