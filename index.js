const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const formData = require("express-form-data");
const  os  = require("os");
// const passport = require("passport");
// const passportConfig = require("./server/middlewares/passport");
const cookieParser = require("cookie-parser");
const response = require("./server/utils/response");
const mongoose = require("mongoose");
// const dbUtilities = require('./server/utils/database');
const routes = require("./server/routes/index");
const { config } = require("dotenv");


const app = express();

config();

const PORT = process.env.PORT || 5000

//global variables
global.Response = response;

//database connection
mongoose.Promise = global.Promise;

//middleware
app.use(logger('dev'));
app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'build')));

const options = {
    uploadDir: os.tmpdir(),
    autoClean: true,
  };
  // parse data with connect-multiparty.
  app.use(formData.parse(options));
  // delete from the request all empty files (size == 0)
  app.use(formData.format());
  // change the file objects to fs.ReadStream
  app.use(formData.stream());
  // union the body and the files
  app.use(formData.union());
// Passport Middleware
// app.use(passport.initialize());
// app.use(passport.session());

// passportConfig(passport);

//routes
app.get('/', function (req, res) {
    return Response.sendSuccess(res, null, 'welcome to hds Request App.');
});

app.get('/doc',(req,res)=>{
        return res.status(200).json(
          {  routes:[{
            "route":"api/auth/role",
            "requestType":"Post - FormData",
            "purpose":"admin user with custom clain",
           "details": [{
            "type":"Exisiting User",
            "req":{
                "uid":"string",
                "role":"string|number|default is 'super'",
                "serviceAccount":"File(json file)"
            }
    },
    {
        "type":"New User",
        "requestType":"Post - FormData",
        "req":{
            "displayName":"Theodore Imonigie",
             "email":"theodoreImonigie@gmail.com",
             "password":"password",
             "role":"string|number|default is 'super'",
             "serviceAccount":"File(json file)"
        }
}
]}]});
})


//api routes
app.use('/api', routes.routes);

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    return res.json({error: err.message});
    //res.render('error');
});

//start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
