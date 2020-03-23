// Following this tutorial: https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf
// The primary function of this component is to route the application
import React from 'react';
import Main from 'components/Main/Main';
import Header from 'components/Header/Header';
import styles from './styles.module.scss';

const App = () => (
  <div className={styles.container}>
    <div id='js-portal' className={styles.portal}/>
    <Header />
    <Main />
  </div>
)

export default App;
