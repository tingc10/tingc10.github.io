import React from 'react';
import TrailingLogo from 'assets/ting-trail.svg'
import styles from './styles.scss';

const AnimatedLogo = () => {
  return (
    <figure className={ styles.container} >
      <TrailingLogo className={ styles.logo } />
    </figure>
  );
}

export default AnimatedLogo;
