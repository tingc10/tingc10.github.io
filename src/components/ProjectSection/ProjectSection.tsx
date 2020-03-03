import * as React from 'react';
import styles from './styles.module.scss';

interface Props {
  title: string;
  description: string;
}

const ProjectSection: React.SFC<Props> = ({title, description, children}) => {
  return <div
    className={styles.container}>
    <section className={styles.description}>
      <h3 className={styles.title}>{title}</h3>
      <p>{description}</p>
    </section>
    {children}
  </div>
}


export default ProjectSection; 