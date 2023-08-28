/* eslint-disable no-undef */
const { default: mongoose } = require('mongoose');
const { uploadFiles } = require('../aws/Aws');
const blogModel = require('../models/blogModel');



const createBlog = async (req, res) => {
    try {
        const userId = req.userId;
        const file = req.files
        const { title, body, tags, category, subCategory, isPublished } = req.body;
        if (!title || !body || !tags || !category || !subCategory || !file) {
            return res.status(400).json({ status: false, message: "Please fill all the required fields" })
        }
        const blogDetails = {
            title,
            body,
            tags: tags.split(','),
            category,
            subCategory: subCategory.split(','),
            isPublished
        }
        if (isPublished) {
            blogDetails.publishedAt = new Date()
        }
        if (file) {
            const url = await uploadFiles(file[0])
            blogDetails.blogImage = url
        }
        blogDetails.authorId = userId;
        const blog = await blogModel.create(blogDetails);
        res.status(201).json({ status: true, message: "Blog created successfully", data: blog })
    } catch (error) {
        res.status(500).json({ status: false, message: error.message })
    }
}


const getBlogs = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(404).json({ status: false, message: "User not found" });
        }
        const blogs = await blogModel.find({isDeleted: false}).populate('authorId').sort({createdAt: -1});
        res.status(200).json({ status: true, message: "Blogs fetched successfully", data: blogs })
    } catch (error) {
        res.status(500).json({ status: false, message: error.message })
    }
}


const updateBlog = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        let { title, body, tags, category, subCategory, isPublished } = req.body;
        if (mongoose.Schema.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({ status: false, message: "Invalid blog id" });
        }
        const blog = await blogModel.findOne({ _id: blogId, isDeleted: false });
        if (!blog) {
            return res.status(404).json({ status: false, message: "Blog not found" });
        }
        if (blog.authorId.toString() !== req.userId) {
            return res.status(403).json({ status: false, message: "Unauthorized access" });
        }
        const blogDetails = {}
        const file = req.files
        if (file) {
            const url = await uploadFiles(file[0])
            blogDetails.blogImage = url
        }
        if (title) {
            blogDetails.title = title
        }
        if (body) {
            blogDetails.body = body
        }
        if (tags) {
            tags = tags.split(',')
            blogDetails.tags = addToSet(tags)
        }
        if (category) {
            blogDetails.category = category
        }
        if (subCategory) {
            subCategory = subCategory.split(',')
            blogDetails.subCategory = addToSet(subCategory)
        }
        if (isPublished) {
            blogDetails.isPublished = isPublished
            blogDetails.publishedAt = new Date()
        }
        const updatedBlog = await blogModel.findByIdAndUpdate(blogId, blogDetails, { new: true });
        res.status(200).json({ status: true, message: "Blog updated successfully", data: updatedBlog })
    } catch (error) {
        res.status(500).json({ status: false, message: error.message })
    }
}


const deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        if (!mongoose.Schema.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({ status: false, message: "Invalid blog id" });
        }
        const blog = await blogModel.findOne({ _id: blogId, isDeleted: false });
        if (!blog) {
            return res.status(404).json({ status: false, message: "Blog not found" });
        }
        if (blog.authorId.toString() !== req.userId) {
            return res.status(403).json({ status: false, message: "Unauthorized access" });
        }

        const deletedBlog = await blogModel.findByIdAndUpdate(blogId, { isDeleted: true, deletedAt: new Date() }, { new: true });
        res.status(200).json({ status: true, message: "Blog deleted successfully", data: deletedBlog })
    }catch (error) {
        res.status(500).json({ status: false, message: error.message })
    }
}


module.exports = {
    createBlog,
    getBlogs,
    updateBlog,
    deleteBlog
}