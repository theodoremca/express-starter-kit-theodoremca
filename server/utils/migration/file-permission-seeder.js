const FilePermission = require("../../models/FilePermission");

const permissions = [
    {code: 0, name: 'no permissions'}, {code: 1, name: 'execute only'}, {code: 2, name: 'write only'},
    {code: 3, name: 'write and execute'}, {code: 4, name: 'read only'}, {code: 5, name: 'read and execute'},
    {code: 6, name: 'read and write'}, {code: 7, name: 'read, write and execute'},
];


const loadFilePermissions = () => {
    let arr = [];
    FilePermission.find().exec((err, data) => {
        if (err) throw err;
        if(data.length > 0) {
            console.log('file permissions already seeded');
        }else {
            permissions.forEach((permission, index) => {

                const newPermission = new FilePermission({
                    name: permission.name,
                    code: permission.code,
                });

                newPermission.save((error, result) => {
                    if (error)
                        throw error;
                    arr.push(result);
                    console.log('file permissions seeded successfully', arr);
                })
            });
        }
    })

}

module.exports = loadFilePermissions;
