const express = require("express");
const  authRoute = require("./auth.route");

const publicRoutes = express.Router();

//register routes here
publicRoutes.use('/auth', authRoute.route);

module.exports = {publicRoutes};
