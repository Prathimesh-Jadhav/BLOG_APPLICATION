const jwt = require('jsonwebtoken')
const secret = '$helo^&'
function generateToken(user){
    const payload={
        id:user._id,
        FullName:user.FullName,
        Email:user.Email,
        ProfileImage:user.ProfileImage,
        role:user.role
    }

    return jwt.sign(payload,secret);
}

function verifyToken(token){
    const user = jwt.verify(token,secret);
    return user;
}

module.exports={
    generateToken,
    verifyToken
}