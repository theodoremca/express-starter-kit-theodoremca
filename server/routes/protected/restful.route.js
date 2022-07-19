const express = require("express");
const restfulController = require("../../controllers/restful.controller");
const restFileController = require("../../controllers/restfile.controller");

const route = express.Router();

route.get('/:endpoint', restfulController.index);
route.post('/:endpoint/create', restfulController.store);
route.post('/:endpoint/files/create', restFileController.upload);

route.get('/:endpoint/:id', restfulController.show);
route.put('/:endpoint/:id/update', restfulController.update);
route.put('/:endpoint/files/:id/update', restFileController.modify);

route.delete('/:endpoint/:id/delete', restfulController.destroy);
route.get('/:endpoint/:id/download', restFileController.download);
route.get('/:endpoint/:id/files/read', restFileController.read);


module.exports = {route};