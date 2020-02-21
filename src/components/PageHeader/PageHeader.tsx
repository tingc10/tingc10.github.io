import * as React from 'react';
import styles from './styles.module.scss';

const PageHeader: React.SFC = ({children}) => {
  return <h1 className={styles.header}>{children}</h1>
}

export default PageHeader;
