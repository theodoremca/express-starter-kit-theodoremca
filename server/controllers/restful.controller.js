const allEndpoints = require("../utils/endpoints");
const _ = require("lodash");

module.exports = {
    //routes GET /api/.../:endpoint, if query string, routes GET /api/.../:endpoint?name=raadaa&status=1
    index: (req, res, next) => {
        let endpoint = req.params.endpoint;
        let model = allEndpoints.endpoints.get(endpoint);
        let noQuery = _.isEmpty(req.query);
        console.log(req.query, noQuery);
        if(noQuery) {
            model.find().sort({created_at: -1}).exec(function (err, result) {
                if(err)
                    res.send(err);
                return Response.sendSuccess(res, result, 'resources obtained successfully');
            })
        }else {
            model.find(req.query).sort({created_at: -1}).exec(function (err, result) {
                if(err)
                    res.send(err);
                return Response.sendSuccess(res, result, 'resources obtained successfully');
            })
        }
    },
    //routes POST /api/.../:endpoint/:id
    store: (req, res, next) => {
        let endpoint = req.params.endpoint;
        let Model = endpoints.get(endpoint);
        const model = new Model(req.body);
        model.save().then(result => {
            return Response.sendSuccess(res, result, 'resource saved successfully');
        }).catch(err => {
            throw err;
        })
    },
    //routes GET /api/.../:endpoint/:id
    show: (req, res, next) => {
        let endpoint = req.params.endpoint;
        let model = endpoints.get(endpoint);
        model.findById(req.params.id, function (error, result) {
            if(error)
                res.send(error);
            return Response.sendSuccess(res, result, 'resource retrieved successfully');
        })
    },
    //routes PUT /api/.../:endpoint/:id
    update: (req, res, next) => {
        let endpoint = req.params.endpoint;
        let model = endpoints.get(endpoint);
        req.body.updated_at = new Date();
        model.findByIdAndUpdate(req.params.id, req.body, function (err, result) {
            if(err)
                res.send(err);
            return Response.sendSuccess(res, result, 'resource updated successfully');

        })
    },
    //routes DELETE /api/.../:endpoint/:id
    destroy: (req, res, next) => {
        let endpoint = req.params.endpoint;
        let model = endpoints.get(endpoint);
        model.findByIdAndRemove(req.params.id, function (err, result) {
            if(err)
                res.send(err);
            return Response.sendSuccess(res, result, 'resource deleted successfully');
        })
    },

}