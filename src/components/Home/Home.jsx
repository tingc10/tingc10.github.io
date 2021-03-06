import React, { Component } from 'react';
import styles from './styles.module.scss';
import AnimatedLogo from 'components/AnimatedLogo/AnimatedLogo';
import PaperContainer from '../PaperContainer/PaperContainer';

class Home extends Component {
  render() {
    return (
      <div className={styles.position}>
        <div className={styles.left}>
          <AnimatedLogo />
        </div>
        <div className= {styles.right}>
          <h1 className={styles.header}>Welcome</h1>
          <p className={styles.intro}>
            My name is Ting and I'm an UI Engineer. Way back when, I used to dabble in art and design. After earning my CSE degree at Michigan, I've since turned my attention towards building delightful web experiences.
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
