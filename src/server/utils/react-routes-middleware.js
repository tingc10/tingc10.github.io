// STILL NEED LOTS OF WORK

// Enable react server side rendering
const path = require('path')
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var Provider = require('react-redux').Provider;

var routes = require(path.resolve('src/client', 'routes'));
var configureStore = require(path.resolve('src/client/store','configureStore'));

function matchReactRoutes(req, res) {
  var initialState = {
    messages: {}
  };

  var store = configureStore(initialState);

  Router.match({ routes: routes.default(store), location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Provider, { store: store },
        React.createElement(Router.RouterContext, renderProps)
      ));
      res.render('layouts/main', {
        html: html,
        initialState: store.getState()
      });
    } else {
      res.sendStatus(404);
    }
  });
}

module.exports = matchReactRoutes;
