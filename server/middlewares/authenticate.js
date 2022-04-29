const jwt = require('jsonwebtoken')
// const admin = require('../../firebas-config')

// const authenticate = (req, res, next) => {
//     try {

//         const token = req.headers.authorization.split(' ')[1]
//         const decode = admin.auth().verifyIdToken(token)

//         // req.user = decode 
//         console.log(decode);
//         next()
//     }
//     catch (error) {
//         console.log(error)
//         res.status(403).json({
//             message: 'Authentication Failed!'
//         })
//     }
// }


const authenticate = (req, res, next) => {
    try {

        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.PRIVATE_KEY)

        req.user = decode 
        // console.log(decode);
        next()
    }
    catch (error) {
        console.log(error)
        res.status(403).json({
            message: 'Authentication Failed!'
        })
    }
}



module.exports = authenticate