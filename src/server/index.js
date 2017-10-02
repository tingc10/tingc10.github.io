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
// The following code is taken from the create-react-app repo
const getWebpackDevServerConfigs = require('./utils/webpack-dev-server-init') // https://github.com/facebookincubator/create-react-app/

// Enable react server side rendering
// var React = require('react');
// var ReactDOM = require('react-dom/server');
// var Router = require('react-router');
// var Provider = require('react-redux').Provider;

// Schema-based solution to model application data
// var mongoose = require('mongoose'); // http://mongoosejs.com/
// var webpack = require('webpack');
// var config = require(path.resolve('config', 'webpack.config.dev'));

// Load environment variables from .env file
dotenv.load();

// ES6 Transpiler
require('babel-core/register');
require('babel-polyfill');

// Controllers
// var contactController = require('./controllers/contact');

// React and Server-Side Rendering
// var routes = require('./app/routes');
// var configureStore = require('./app/store/configureStore').default;

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
app.use(express.static(path.resolve('public')));
// app.post('/contact', contactController.contactPost);

// // React server rendering
// app.use(function(req, res) {
//   var initialState = {
//     messages: {}
//   };

//   var store = configureStore(initialState);

//   Router.match({ routes: routes.default(store), location: req.url }, function(err, redirectLocation, renderProps) {
//     if (err) {
//       res.status(500).send(err.message);
//     } else if (redirectLocation) {
//       res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
//     } else if (renderProps) {
//       var html = ReactDOM.renderToString(React.createElement(Provider, { store: store },
//         React.createElement(Router.RouterContext, renderProps)
//       ));
//       res.render('layouts/main', {
//         html: html,
//         initialState: store.getState()
//       });
//     } else {
//       res.sendStatus(404);
//     }
//   });
// });

// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

if (app.get('env') === 'development') {
  getWebpackDevServerConfigs((port,compiler, serverConfig) => {
    
    app.use(require('webpack-dev-middleware')(compiler, serverConfig));
    app.use(require('webpack-hot-middleware')(compiler));
    app.listen(port, function() {
      console.log(chalk.cyan(`Starting the development server on port ${port}\n`));
    });
  })
} else if (app.get('env') === 'production') {
  app.listen(app.get('port'), function() {
    console.log(chalk.cyan(`Starting the production server on port ${app.get('port')}\n`));
  });
} else {
  console.log("Invalid Environment");
}


module.exports = app;
