// const express = require("express");
// const router = express.Router();
// const _=require('lodash')
// const Admin = require("../../models/admin/admin");
// const { User } = require("../../models/userlogin/user");

//  Get all reported blogs for review
// router.get('/api/admin/reported-blogs', async (req, res) => {
//   try {
//     const reportedBlogs = await Blog.find({ 'reports.0': { $exists: true } });
//     res.status(200).json(reportedBlogs);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// // Accept a reported blog
// router.post('/api/admin/reported-blog/:id/accept', async (req, res) => {
//   try {
//     const blogId = req.params.id;
//     const blog = await Blog.findById(blogId);

//     if (!blog) {
//       return res.status(404).json({ error: 'Blog not found' });
//     }

//     // Perform actions to accept the reported blog (e.g., remove reports)
//     blog.reports = [];
//     await blog.save();

//     res.status(200).json({ message: 'Blog accepted successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// // Reject a reported blog
// router.post('/api/admin/reported-blog/:id/reject', async (req, res) => {
//   try {
//     const blogId = req.params.id;
//     const blog = await Blog.findById(blogId);

//     if (!blog) {
//       return res.status(404).json({ error: 'Blog not found' });
//     }

//     // Perform actions to reject the reported blog (e.g., delete the blog)
//     await Blog.findByIdAndDelete(blogId);

//     res.status(200).json({ message: 'Blog rejected successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// module.exports = router;