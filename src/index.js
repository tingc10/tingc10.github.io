import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import './index.scss';
import App from './components/App/App';
import registerServiceWorker from './workers/registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'

setTimeout(() => {
  ReactDOM.render((
    <AppContainer>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppContainer>
  ), document.getElementById('root'));
  registerServiceWorker();
})



// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App/App', () => {
    const NextApp = require('./components/App/App').default;
    ReactDOM.render((
      <AppContainer>
        <BrowserRouter>
          <NextApp/>
        </BrowserRouter>
      </AppContainer>
    ), document.getElementById('root'));
  });
}
