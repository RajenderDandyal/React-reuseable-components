let express = require("express");
let app = express();
let mongoose = require("mongoose");
let bodyParser = require('body-parser');
let passport = require('passport');
let path = require('path');
let cors  = require("cors");
let compression = require("compression");

const users = require('./routes/api/users');


//body-parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// cors
//app.use(cors()); // using default .. allowed to everyone
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// compression of res
app.use(compression());
// DB config
let mongoDB = require('./config/keys').mongoURI;

// connect to DB
mongoose.connect(mongoDB, { useNewUrlParser: true })
    .then(() => console.log("Connected to mongoDB") )
    .catch((e) => console.log(e));


// passport middleware
app.use(passport.initialize());

// passport config
// running the exported function from "./config/passport" with passport as parameter
require("./config/passport")(passport);

//use routes
app.use('/api/users', users);



//Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'))
}

/*app.get("*", (req,res) =>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})*/


// error handling

// route not found
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.message = 'Invalid route';
  error.status = 404;
  next(error);
});
// log errors to console
app.use(logErrors);
//
app.use(clientErrorHandler);
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.json({
    status:error.status || 500,
    message: error.message,
    error: {
      error: error.message,
    },
  });
});

// log errors to console
function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}
// error handling for xhr request
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    //console.log('xhr request');
    res.status(400).send({status: 400, message: "Bad request from client", error: err.message });
  } else {
    next(err);
  }
}
const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server running on port ' + port));