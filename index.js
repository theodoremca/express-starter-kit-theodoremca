const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
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


// Passport Middleware
// app.use(passport.initialize());
// app.use(passport.session());

// passportConfig(passport);

//routes
app.get('/', function (req, res) {
    return Response.sendSuccess(res, null, 'welcome to Cafia Request App.');
});


//api routes
app.use('/api', routes.routes);

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
