import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from 'Home/Home';
import Portfolio from 'Portfolio/Portfolio';
import GridPortfolio from 'GridPortfolio/GridPortfolio';
import Styles from 'Styles/Styles';
import styles from './styles';

const Main = () => (
  <main className={styles.container}>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/portfolio' component={GridPortfolio} />
    </Switch>
  </main>
)

export default Main;
