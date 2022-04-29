const express = require("express");
const publicRoutes = require("./unprotected/index");
const privateRoutes = require("./protected/index");

const routes = express.Router();
routes.use('/', publicRoutes.publicRoutes);
routes.use('/', privateRoutes.privateRoutes);

module.exports = {routes};