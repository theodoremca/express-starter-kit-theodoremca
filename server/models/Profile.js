const mongoose = require('mongoose');
const { Schema } = mongoose;

const { config } = require("dotenv");

config();

const UserSchema = new Schema({
    username: {
        type: String,
        // unique: true,
        // required: true,
    },
    email: {
        type: String,
        // required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        // required: true,
        // unique: true
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date },

    // verified: {
    //     type: Boolean,
    //     default: false,
    // },
    // status: {
    //     type: Number,
    //     default: 1,
    // },
    // category: {
    //     type: String,
    //     default: 'user',
    // },
    // token: {
    //     type: String,
    // },
    // roles: [{
    //     type: mongoose.Schema.Types.ObjectId, ref: 'Role'
    // }],
    // created_at: {
    //     type: Date,
    //     default: Date.now(),
    // },
    // updated_at: {
    //     type: Date,
    // },
});

module.exports = mongoose.model('Profile', UserSchema);