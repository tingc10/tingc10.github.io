const chalk = require('chalk');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression'); // https://github.com/expressjs/compression
// Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
var cookieParser = require('cookie-parser'); // https://github.com/expressjs/cookie-parser
var bodyParser = require('body-parser');
// String validator middleware for express
var expressValidator = require('express-validator'); // https://github.com/ctavan/express-validator
// Load environment variables from a .env file into `process.env`
var dotenv = require('dotenv');
var paths = require(path.resolve('config/paths'))
if (process.env.NODE_ENV === 'development'){
  // The following code is taken from the create-react-app repo
  const getWebpackDevServerConfigs = require('./utils/webpack-dev-server-init') // https://github.com/facebookincubator/create-react-app/
}
var publicPath = process.env.NODE_ENV === 'development' ? paths.appPublic : paths.appBuild
// React server side rendering is half baked, cribbed some code from
// a boilerplate, but it's not working
// var matchReactRoutes = require('./utils/react-routes-middleware')

// Schema-based solution to model application data
// var mongoose = require('mongoose'); // http://mongoosejs.com/

// Load environment variables from .env file
dotenv.config();

// ES6 Transpiler
require('babel-core/register');
require('babel-polyfill');

// Controllers
// var contactController = require('./controllers/contact');

var app = express();

// var compiler = webpack(config);
// mongoose.connect(process.env.MONGODB);
// mongoose.connection.on('error', function() {
//   console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
//   process.exit(1);
// });

app.set('port', process.env.PORT || 3002);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(publicPath));
// app.post('/contact', contactController.contactPost);

// React server rendering
// app.use(matchReactRoutes);

// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

// Currently using React Router to manage all get paths
// Any path will return index.js then the client wil manage the proper view
// This needs to be called last, otherwise bundle.js will also return index.html
function catchAllGetRequests(app) {
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(publicPath, 'index.html'));
  });
}
if (app.get('env') === 'development') {
  getWebpackDevServerConfigs((port,compiler, serverConfig) => {
    
    app.use(require('webpack-dev-middleware')(compiler, serverConfig));
    app.use(require('webpack-hot-middleware')(compiler));
    catchAllGetRequests(app)
    app.listen(port, function() {
      console.log(chalk.cyan(`Starting the development server on port ${port}\n`));
    });
  })
} else if (app.get('env') === 'production') {
  catchAllGetRequests(app)
  app.listen(app.get('port'), function() {
    console.log(chalk.cyan(`Starting the production server on port ${app.get('port')}\n`));
  });
} else {
  console.log("Invalid Environment");
}


module.exports = app;
