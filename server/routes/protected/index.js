const express = require("express");
const passport = require("passport");
const restfulRoute = require("./restful.route");
const adminRoute = require("./admin.route");
const userRoute = require("./user.route");
const authenticate = require("../../middlewares/authenticate");
const authorizeUser = require("../../middlewares/authorize")
// const authorization = require("../../middlewares/authorize");

const privateRoutes = express.Router();
// const auth = authenticate;
 
//register routes here
privateRoutes.use('/user', authenticate, userRoute.route);
privateRoutes.use('/admin', authenticate, authorizeUser(["admin"]), adminRoute.route);
privateRoutes.use('/admin', authenticate, authorizeUser(["admin"]), restfulRoute.route);

module.exports ={ privateRoutes};