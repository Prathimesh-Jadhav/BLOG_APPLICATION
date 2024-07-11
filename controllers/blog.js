const blog = require('../models/blog');

async function handleAddBlog(req,res){
    const curr_blog = req.body;
    try{
        const newblog = await blog.create({
            title:curr_blog.title,
            body:curr_blog.body,
            coverImage:`/${req.file.filename}`,
            createdBy:req.user.id
        })
        var blogs = await blog.find({})
    }
    catch{
        return res.render('AddBlog',{
            loggedin:req.user,
            blogerror:"Please Give All Inputs"
        })
    }
    return res.render('home',{
        loggedin:req.user,
        blogs:blogs
    })
}

module.exports= handleAddBlog;