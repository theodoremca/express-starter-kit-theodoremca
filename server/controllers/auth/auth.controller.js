const User = require("../../models/User");
const { config } = require("dotenv");
const jwt = require("jsonwebtoken");
const admin = require("./../../../firebas-config")

config();

module.exports = {
    login: (req, res) => {
        let { number, password } = req.body;
        User.findOne({
            number: number
        }, function (err, user) {
            if (err) throw err;

            if (!user) {
                res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
            } else {
                // check if password matches
                user.comparePassword(password, function (err, isMatch) {
                    if (isMatch && !err) {
                        const token = jwt.sign({
                            name: user.number,
                            role: user.category
                        },
                            process.env.PRIVATE_KEY,
                            {
                                expiresIn: 604800 // 1 week
                            });
                        user.password = null;
                        res.json({
                            success: true,
                            token: token,
                            data: user
                        })
                    } else {
                        res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
                    }
                });
            }
        });

    },

    register: (req, res) => {
        let { number, password, password_confirmation } = req.body;
        if (password !== password_confirmation) {
            return Response.sendError(res, 'Password confirmation failed, mismatched passwords');
        }

        User.findOne({
            number: number
        }, function (err, result) {
            if (err) throw err;
            if (result) {
                return Response.sendError(res, 'registration failed. user already exist');
            }
            let newUser = new User({
                number: number,
                password: password,
            });
            newUser.save(function (err, user) {
                if (err) throw err;

                const token = jwt.sign({ data: user }, process.env.PRIVATE_KEY, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    data: user
                })
            })
        })
    },

    loggedUser: (req, res) => {
        if (!req.user) {
            return Response.sendError(res, 'authenticated user not found');
        }
        return Response.sendSuccess(res, req.user, 'logged user retrieved successful');
    },

    logout: (req, res) => {
        localStorage.clear();
        return Response.sendSuccess(res, { url: '/' }, 'user logged out successfully');
    },

    createOrUpdateSuperAdmin: (req, res) => {
        let { displayName, email, password, uid, role="super"} = req.body;
        const serviceAccount = req.files.serviceAccount.path;
        const authAdmin = admin(serviceAccount);
        const auth = authAdmin.auth();
        if (uid) {
            auth
                .setCustomUserClaims(uid, { role: role })
                .then(() => {
                    return res.status(200).json({role})
                })
                .catch(function (error) {
                    return res.status(200).json({error})
                });
            ;
            return;
        }
     auth
            .createUser({
                displayName,
                email,
                password: password,
            })
            .then((user) => {
                auth
                    .setCustomUserClaims(user.uid, { role: role })
                    .then(() => {
                        return res.status(200).json({user,role})
                    });
            })
            .catch(function (error) {
                return res.status(200).json({error})});
    },

}

