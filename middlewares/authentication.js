const { verifyToken } = require("../services/auth");

function checkLoggedIn(req,res,next){
    const cookie = req.cookies.token;
    if(!cookie) return next();
    const user  = verifyToken(cookie);
    if(!user) return next();
    req.user=user;
    next();
}

module.exports=checkLoggedIn;