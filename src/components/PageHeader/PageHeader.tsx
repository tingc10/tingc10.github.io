import * as React from "react";
import styles from "./styles.module.scss";

interface Props {
  description?: string;
}

const PageHeader: React.SFC<Props> = ({ children, description }) => {
  return (
    <header className={styles.container}>
      <h1 className={styles.header}>{children}</h1>
      {description && <p>{description}</p>}
    </header>
  );
};

export default PageHeader;
