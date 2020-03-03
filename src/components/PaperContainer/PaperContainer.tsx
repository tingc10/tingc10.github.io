import * as React from "react";
import styles from './styles.module.scss';

const PaperContainer: React.SFC = ({ children }) => {
  return <main className={styles.container}>{children}</main>;
};

export default PaperContainer;
