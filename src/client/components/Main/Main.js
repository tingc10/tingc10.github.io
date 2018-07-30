import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from 'Home/Home';
import Portfolio from 'Portfolio/Portfolio';
import Styles from 'Styles/Styles';
import styles from './styles';

const Main = () => (
  <main className={styles.container}>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/portfolio' component={Portfolio} />
      {<Route path='/styles' component={Styles} />}
    </Switch>
  </main>
)

export default Main;
