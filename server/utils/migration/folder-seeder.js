const mongoose = require("mongoose");
const Folder = require("../../models/Folder");

let objectId = mongoose.Types.ObjectId;
let _id = new objectId('6092a1a1a1a1a1a1a1a1a1a1');

const loadRootFolder = function () {
    Folder.find().exec(function (err, folder) {
        if(err)
            throw err;
        if(folder.length > 0){
            console.log('folder already seeded', folder);
        }
        else {
            let newFolder = new Folder({
                _id: _id,
                name: 'root',
            });
            newFolder.save(function (err, folder) {
                if(err) throw err;
                console.log('database seeded successfully with', folder);
            })
        }
    });
};
module.exports = loadRootFolder;