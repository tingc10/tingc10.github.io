import React from 'react';
import { ReactComponent as TrailingLogo } from '@assets/ting-trail.svg'
import styles from './styles.module.scss';

const AnimatedLogo = () => {
  return (
    <figure className={ styles.container} >
      <TrailingLogo className={ styles.logo}/>
    </figure>
  );
}

export default AnimatedLogo;
