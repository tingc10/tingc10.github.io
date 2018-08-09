/* Need to revisit using https://github.com/mars/heroku-cra-node instructions first
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
require('dotenv').config();
var paths = require(path.resolve('config/paths'))
let getWebpackDevServerConfigs;
if (process.env.NODE_ENV === 'development'){
  // The following code is taken from the create-react-app repo
  getWebpackDevServerConfigs = require('./utils/webpack-dev-server-init') // https://github.com/facebookincubator/create-react-app/
}
var publicPath = process.env.NODE_ENV === 'development' ? paths.appPublic : paths.appBuild
// React server side rendering is half baked, cribbed some code from
// a boilerplate, but it's not working
// var matchReactRoutes = require('./utils/react-routes-middleware')

// Schema-based solution to model application data
// var mongoose = require('mongoose'); // http://mongoosejs.com/

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

app.set('port', process.env.PORT || 5000);
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
https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0
app.listen(app.get('port'), function() {
  console.log(chalk.cyan(`Starting the ${app.get('env')} server on port ${app.get('port')}\n`));
});

module.exports = app;
*/
const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../../build')));

  // Answer API requests.
  app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../../build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
  });
}

