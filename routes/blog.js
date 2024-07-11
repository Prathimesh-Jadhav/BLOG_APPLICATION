const express = require('express');
const path = require('path')
const mongoose = require('mongoose')
const router = express.Router();
const handleAddBlog = require('../controllers/blog')
const multer = require('multer');
const blogModel = require('../models/blog')
const { route } = require('./user');
const userModel = require('../models/user');
const commentModel = require('../models/comments');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('./public/'))
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({ storage: storage })

router.get('/newBlog', (req, res) => {

    res.render('AddBlog', {
        loggedin: req.user
    })


})

router.get('/myblogs', async (req, res) => {
    const id = new mongoose.mongo.ObjectId(req.user.id)
    const blog = await blogModel.find({ createdBy: id })

    if (!blog) return res.render('home');

    return res.render('home', {
        blogs: blog,
        loggedin: req.user
    })
})

router.get('/:id', async (req, res) => {
    const blog = await blogModel.findById(req.params.id).populate('createdBy');
    const comments = await commentModel.find({ blogid: req.params.id })
    if (!blog) return res.render('home')
    if (req.user) {
        return res.render('Readblog', {
            blogs: blog,
            loggedin: req.user,
            comments: comments
        })
    }
    else {
        return res.render('Request')
    }
})

router.post('/comment/:id', async (req, res) => {
    const comm = await commentModel.create({
        content: req.body.content,
        createdBy: req.user.id,
        blogid: req.params.id
    })

    res.redirect(`/blog/${req.params.id}`)
})


router.post('/newBlog', upload.single('coverImage'), handleAddBlog);



module.exports = router;