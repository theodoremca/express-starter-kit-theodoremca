

const adminSDK = require("firebase-admin");
// const serviceAccount = require("./serviceAccount.json");
// adminSDK.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });

console.log(`AAAAAAAAAAAAAAAAAAAA: ${adminSDK.apps.length.toString()}`);


const admin = (serviceAccount) => adminSDK.apps.length == 0 ? adminSDK.initializeApp({
    credential: adminSDK.credential.cert(serviceAccount)
}): adminSDK;
module.exports = admin;






// const admin = require("firebase-admin");
// const serviceAccount = require("./serviceAccount.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });

// module.exports = admin;

