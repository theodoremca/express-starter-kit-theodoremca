const User = require("../../models/User");

const LoadUsers = function () {
    User.find().exec(function (err, user) {
        if(err)
            throw err;
        if(user.length > 0){
            console.log('users already seeded', user);
        }
        else {
            let newUser = new User({
                username: 'superadmin@localhost',
                password: 'secret'
            });
            newUser.save(function (err, result) {
                if(err) throw err;
                console.log('database seeded successfully with', result);
            })
        }
    });
};
module.exports = LoadUsers;
