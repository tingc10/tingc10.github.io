import * as React from "react";
import styles from './styles.module.scss';

const PaperContainer: React.SFC = ({ children }) => {
  return <main className={styles.wrapper}>
    <div className={styles.container}>
      {children}
    </div>
  </main>;
};

export default PaperContainer;
