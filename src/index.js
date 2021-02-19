import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import './index.scss';
import App from './components/App/App';
import registerServiceWorker from './workers/registerServiceWorker';
import { HashRouter } from 'react-router-dom'

ReactDOM.render((
  <AppContainer>
    <HashRouter>
      <App />
    </HashRouter>
  </AppContainer>
), document.getElementById('root'));
registerServiceWorker();

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App/App', () => {
    const NextApp = require('./components/App/App').default;
    ReactDOM.render((
      <AppContainer>
        <HashRouter>
          <NextApp/>
        </HashRouter>
      </AppContainer>
    ), document.getElementById('root'));
  });
}
