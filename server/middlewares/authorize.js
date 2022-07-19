const jwt = require('jsonwebtoken')
// const jwt = "jsonwebtoken";

const authorizeUser = (roles) => {
        return (req, res, next) => {
    
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.PRIVATE_KEY)

        const user_role = decode.role 
        // console.log(decode)
    switch(user_role){
        case 'superadmin':
            if(roles.includes(user_role)) {
                next()
            }else{
                return res.status(401).json("You are not authorized!");
            }
            break;
        case 'admin':
            if(roles.includes(user_role)) {
                next()
            }else{
                return res.status(401).json("You are not authorized!");
            }
            break;
        case 'student':
            if(roles.includes(user_role)) {
                next()
            }else{
                return res.status(401).json("You are not authorized!");
            }
            break;
        case 'staff':
            if(roles.includes(user_role)) {
                next()
            }else{
                return res.status(401).json("You are not authorized!");
            }
            break;
        case 'hod':
            if(roles.includes(user_role)) {
                next()
            }else{
                return res.status(401).json("You are not authorized!");
            }
            break;
        case 'ict-staff':
            if(roles.includes(user_role)) {
                next()
            }else{
                return res.status(401).json("You are not authorized!");
            }
            break;
        case 'portal':
            if(roles.includes(user_role)) {
                next()
            }else{
                return res.status(401).json("You are not authorized!");
            }
            break;
        case 'library':
            if(roles.includes(user_role)) {
                next()
            }else{
                return res.status(401).json("You are not authorized!");
            }
            break;
        default:
            return res.status(400).json("Bad Request!");
    }
    
}
}



module.exports = authorizeUser