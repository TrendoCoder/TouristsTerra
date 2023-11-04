const express=require('express')
const router=express.Router()
const blogpostcontroller=require('../controller/blogpostController')

router.get('/blogs',blogpostcontroller.getAllBlogs)
router.get('/blog/:id',blogpostcontroller.getBlog)
router.get("/:id/like/:like",blogpostcontroller.postLikeBlog)
router.post('/:id/comment',blogpostcontroller.postCommentBlog)
//These routes will be transfer to the admin portal 

router.post('/blog',blogpostcontroller.createBlog)
router.delete("/:id",blogpostcontroller.deleteBlog)
router.put('/editblog/:id',blogpostcontroller.updateBlog)
module.exports=router