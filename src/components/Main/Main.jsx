import React, { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import Home from "components/Home/Home";
import ArtPortfolio from "components/ArtPortfolio/ArtPortfolio";
import Portfolio from "components/Portfolio/Portfolio";
import PaperContainer from "../PaperContainer/PaperContainer";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import './styles.module.scss';

const Main = () => {
  const location = useLocation();
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  return (
    <PaperContainer>
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          classNames="transition"
          timeout={500}
        >
          <Switch location={location}>
            <Route exact path="/" component={Home} />
            <Route exact path="/code" component={Portfolio} />
            <Route path="/art" component={ArtPortfolio} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </PaperContainer>
  );
};

export default Main;
