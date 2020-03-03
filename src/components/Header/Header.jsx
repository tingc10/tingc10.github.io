import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.scss';
import { routes } from '../../utils/routes';

const Header = () => (
  <nav className={styles.container}>
    <ul className={styles.list}>
      <li className={styles.navItem}>
        <NavLink exact activeClassName={styles.active} className={styles.navLink} to={routes.home}>Home</NavLink>
      </li>
      <li className={styles.navItem}>
        <NavLink activeClassName={styles.active} className={styles.navLink} to={routes.code}>Code</NavLink>
      </li>
      <li className={styles.navItem}>
        <NavLink activeClassName={styles.active} className={styles.navLink} to={routes.art}>Art</NavLink>
      </li>
    </ul>
  </nav>
)

export default Header;
