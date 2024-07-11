require('dotenv').config()
const path = require('path');
const express = require('express');
const app = express();
const userroute = require('./routes/user')
const mongoose =require('mongoose');
const cookieParser = require('cookie-parser');
const checkLoggedIn = require('./middlewares/authentication');
const blogRouter = require('./routes/blog')
const blogModel = require('./models/blog')


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('DB connected');
}).catch(()=>{
    console.log('error in connecting DB');
    
})

const PORT = process.env.PORT;


app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkLoggedIn)
app.use(express.static(path.resolve('./public')))

app.get('/',async (req,res)=>{
    let blog =null;
    if(req.user){
        blog = await blogModel.find({})
    }
    else{
        return res.render('Request')
    }
    res.render('home',{
        loggedin:req.user,
        blogs:blog
    })
})

app.use('/blog',blogRouter)

app.use('/user',userroute);

app.listen(PORT,()=>{
    console.log('Server started..')
})