const express = require('express')
const router = express.Router()
const blogpostcontroller=require('../../../controllers/blog/blogcontroller')

router.get('/blogs',blogpostcontroller.getAllBlogs)
router.get('/blog/:id',blogpostcontroller.getBlog)
router.put('/:id/like', blogpostcontroller.likeDislikePost)
router.post('/:id/comment',blogpostcontroller.postCommentBlog)
// router.get('/:id/comments',blogpostcontroller.getAllCommentsBlog)
router.get('/recentBlogs',blogpostcontroller.getRecentBlogs)
//These routes will be transfer to the admin portal 

router.post('/createblogs', blogpostcontroller.createBlog);
router.delete("/:id", blogpostcontroller.deleteBlog)
router.put('/editblog/:id',blogpostcontroller.updateBlog)
module.exports = router