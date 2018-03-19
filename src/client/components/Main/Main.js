import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from 'Home/Home'
import Portfolio from 'Portfolio/Portfolio'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      {/*<Route path='/portfolio' component={Portfolio} />*/}
      <Portfolio />
    </Switch>
  </main>
)

export default Main;
