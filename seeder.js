const mongoose = require("mongoose");
const dbUtilities = require('./server/utils/database');
// const loadUsers = require('./server/utils/migration/user-seeder');
// const loadBanks = require("./server/utils/migration/bank-seeder");
// const loadFilePermissions = require("./server/utils/migration/file-permission-seeder");
// const loadRootFolder = require("./server/utils/migration/folder-seeder");
//db connection
mongoose.Promise = global.Promise;

//seeders
// loadUsers();
// loadBanks();
// loadFilePermissions();
// loadRootFolder();