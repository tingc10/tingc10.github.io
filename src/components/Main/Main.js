import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from 'components/Home/Home';
import ArtPortfolio from 'components/ArtPortfolio/ArtPortfolio';
import Portfolio from 'components/Portfolio/Portfolio';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/code' component={Portfolio} />
      <Route path='/art' component={ArtPortfolio} />
    </Switch>
  </main>
)

export default Main;