const express = require("express");
const profileController = require("../../controllers/user/profile.controller");

const route = express.Router();

route.get('/profile', profileController.index);
route.get('/profile/:id', profileController.show);
route.put('/profile/:id/update', profileController.update);
route.post('/create-profile/:id', profileController.store);
route.delete('/profile/:id/delete', profileController.destroy);




module.exports = { route };
