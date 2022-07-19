const _ = require("lodash");
const mongoose = require("mongoose");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

module.exports = {
    //routes GET /api/.../:endpoint, if query string, routes GET /api/.../:endpoint?name=raadaa&status=1
    index: (req, res) => {
        let noQuery = _.isEmpty(req.query);
        let builder = null;
        // if (!noQuery) {
        //     builder = req.query;
        //     if (req.query.department)
        //         builder.sender = new mongoose.Types.ObjectId(req.query.department);
        //     if (req.query.file)
        //         builder.file = new mongoose.Types.ObjectId(req.query.file);
        //     if (req.query.sender)
        //         builder.sender = new mongoose.Types.ObjectId(req.query.sender);
        // }

        Profile.find(builder).sort({ created_at: -1 }).populate('profile').exec(function (err, result) {
            if (err)
                return res.send(err);
            return res.send({ success: true, data: result, message: 'Profile retrieved successfully' });
        })
    },
    //routes POST /api/.../:endpoint/:id
    store: (req, res) => {
        console.log(req.params.id)
        Profile.findOne({
            user_id: req.params.id,

        }, function (err, result) {
            if (err) {
                throw err;
            }
            if (result) {
                // console.log("hello " + result)
                req.body.updated_at = new Date();
                Profile.findOneAndUpdate(req.params.id, req.body, { new: true }, function (err, result2) {
                    if (err)
                        return res.send(err);
                    return res.status(200).send({ success: true, data: result2, message: 'Profile updated successfully' });

                })
            }
            else {
                // console.log("hello No result", req.params.id)
                req.body.user_id = req.params.id;
                const profile = new Profile(req.body);

                profile.save().then(result => {
                    return res.status(200).send({ success: true, data: result, message: 'Profile saved successfully' });
                }).catch(err => {
                    throw err;
                })
            }
        })
    },
    //routes GET /api/.../:endpoint/:id
    show: (req, res) => {
        Profile.findOne(req.params.id).populate('user').exec((err, result) => {
            if (err)
                return res.send(err);
            return res.status(200).send({ success: true, data: result, message: 'Profile retrieved successfully' });
        })
    },
    //routes PUT /api/.../:endpoint/:id
    update: (req, res) => {
        req.body.updated_at = new Date();
        Profile.findOneAndUpdate(req.params.id, req.body, { new: true }, function (err, result) {
            if (err)
                return res.send(err);
            return res.status(200).send({ success: true, data: result, message: 'Profile updated successfully' });

        })
    },
    //routes DELETE /api/.../:endpoint/:id
    destroy: (req, res) => {
        Profile.findOneAndRemove(req.params.id, function (err, result) {
            if (err)
                res.send(err);
            return res.status(200).send({ success: true, data: result, message: 'Actitvity deleted successfully' });
        })
    },

}