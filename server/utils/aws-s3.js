const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const path =require( "path");
// const {config} = require("dotenv");

// config();
require('dotenv').config();
const {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_DEFAULT_REGION, AWS_BUCKET, STORAGE_BASE_PATH} = process.env;

const s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
});

 const s3Upload = (filename, folder) => multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: AWS_BUCKET,
        metadata: (req, file, cb) => {
            cb(null, {fieldName: file.fieldname})
        },
        key: (req, file, cb) => {
            cb(null, `${STORAGE_BASE_PATH}/${folder}/${filename}${path.extname(file.originalname)}`)
        }
    })
});

 const s3Delete = (path) => {
    const params = {
        Bucket: AWS_BUCKET,
        Key: path
    };

    return new Promise((resolve, reject) => {
        s3.deleteObject(params, (err, data) => {
            if(err)
                reject(err);
            else
                resolve(data);
        })
    })
};

 const s3Download = (path) => {
    const params = {
        Bucket: AWS_BUCKET,
        Key: path
    };
    return new Promise((resolve, reject) => {
        s3.getObject(params, (err, data) => {
            if (err)
                reject(err);
            else
                resolve(data);
        })
    })
};

 const s3Filepath = (key) => {
    return `https://${AWS_BUCKET}.s3.amazonaws.com/${key}`;
}

module.exports = {s3Upload,s3Delete,s3Download,s3Filepath}
