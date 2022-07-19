const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt-nodejs');
const {config} = require("dotenv");

config();

const UserSchema = new Schema({
    number: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Profile'
    },
    verified: {
        type: Boolean,
        default: false,
    },
    status: {
        type: Number,
        default: 1,
    },
    category: {
        type: String,
        default: 'user',
    },
    token: {
        type: String,
    },
    roles: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Role'
    }],
    created_at: {
        type: Date,
        default: Date.now(),
    },
    updated_at: {
        type: Date,
    },
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

UserSchema.pre('save', function (next) {
    let user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(process.env.HASH, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

module.exports =  mongoose.model('User', UserSchema);
