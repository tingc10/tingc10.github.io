import React, { Component } from 'react';
import styles from './styles';
import AnimatedLogo from 'AnimatedLogo/AnimatedLogo';

class Home extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <AnimatedLogo />
        </div>
        <div className= {styles.right}>
          <h1 className={styles.header}>Welcome</h1>
          <p className={styles.intro}>
            My name is Ting and I'm an UI Engineer. Way back when, I used to dabble in art and design. Since then, I've picked up a few new skills and turned my attention towards building delightful web experiences.
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
