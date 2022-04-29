const User = require("../models/User");

 const auth = (req, res, next) => {
    let token = req.cookies.auth;
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return Response.sendError(res, 'unauthenticated', [{error: 'unauthenticated'}], 419);

        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = {auth}