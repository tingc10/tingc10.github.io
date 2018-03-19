import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.css'

const Header = () => (
  <header>
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.navItem}>
          <Link className={styles.navLink} to='/'>Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.navLink} to='/portfolio'>Portfolio</Link>
        </li>
      </ul>
    </nav>
  </header>
)

export default Header;
