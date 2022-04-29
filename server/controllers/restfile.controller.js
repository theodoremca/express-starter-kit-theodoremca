const {allEndpoints, allFolders} = require("../utils/endpoints");
const {s3Upload, s3Filepath, s3Delete, s3Download} = require("../utils/aws-s3");
require("dotenv").config();


module.exports = {
    upload: (req, res) => {
        let endpoint = req.params.endpoint;
        let folder = allFolders.folders.get(endpoint);
        let Model = allEndpoints.endpoints.get(endpoint);

        if(req.files) {
            let upload = s3Upload(`${Date.now()}-upload`, `${folder}`).single('file');
            upload(req, res, (err) => {
                if(err) {
                    res.status(400).send(err + "hello");
                }

                const inputs = fileInput(req);
                const model = new Model(inputs);
                saveModel(model, res, 'file uploaded and saved successfully');
            });
        }else {
            const model = new Model(req.body);
            saveModel(model, res, 'file info saved successfully');
        }

    },
    modify: (req, res) => {
        let endpoint = req.params.endpoint;
        let folder = folders.get(endpoint);
        let model = endpoints.get(endpoint);

        model.findById(req.params.id, function (err, result) {
            if(err)
                res.send(err);
            if(req.files) {
                if(result.file_url) {
                    //delete existing fle
                    s3Delete(result.file_url).then(data => {
                        //do upload
                        let upload = s3Upload(`${Date.now()}-upload`, `${folder}`).single('file');
                        upload(req, res, (err) => {
                            if(err) {
                                res.status(400).send(err);
                            }

                            updateModel(model, req, res, 'file replaces and information updated successfully');
                        });
                    }).catch(err => {
                        res.status(400).send(err);
                    })
                }else {
                    //do upload
                    let upload = s3Upload(`${Date.now()}-upload`, `${folder}`).single('file');
                    upload(req, res, (err) => {
                        if(err) {
                            res.status(400).send(err);
                        }

                        updateModel(model, req, res, 'file replaces and information updated successfully');
                    });
                }
            }else {
                updateModel(model, req, res, 'file information updated successfully');
            }
        })

    },
    read: (req, res) => {
        let endpoint = req.params.endpoint;
        let model = endpoints.get(endpoint);

        model.findById(req.params.id, function (err, result) {
            if (err)
                res.send(err);
            s3Download(result.file_url).then(data => {
                res.send(data);
            }).catch(err => {
                throw err;
            })
        })
    },
    download: async (req, res) => {
        try{
            let endpoint = req.params.endpoint;
            let model = endpoints.get(endpoint);

            const result = await model.findById(req.params.id).exec();
            return s3Filepath(result.file_url);
        }catch (e) {
            return null;
        }

    }
}
const saveModel = (model, res, message) => {
    model.save().then(result => {
        return res.status(200).send({success: true, data: result, message: message})
    }).catch(err => {
        return res.send(err);
    });
};
const updateModel = (model, req, res, message) => {
    const input = fileInput(req);
    model.findByIdAndUpdate(req.params.id, input, function (err, result) {
        if(err)
            res.send(err);
        return res.status(200).send({success: true, data: result, message: message});
    });
};

const fileInput = (req) => {
    const inputs = req.body;
    if (req.file) {
        inputs.file_url = req.file.key;
        inputs.extension = req.file.mimetype.split('/')[1];
        inputs.size = req.file.size;
    }
    return inputs;
}