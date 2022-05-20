const express = require("express");
const passport = require("passport");
const authController = require("../../controllers/auth/auth.controller");

const route = express.Router();

route.post('/login', authController.login);
route.post('/register', authController.register);
route.post('/role', authController.createOrUpdateSuperAdmin);
// route.get('/user', passport.authenticate('jwt', {session:false}), authController.loggedUser);
route.get('/logout', authController.logout);

module.exports = {route};
