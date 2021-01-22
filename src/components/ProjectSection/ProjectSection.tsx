import * as React from 'react';
import styles from './styles.module.scss';

interface Props {
  title: string;
  description?: string;
  renderDescription?: React.FC;
}

const ProjectSection: React.FC<Props> = ({title, description, renderDescription: RenderedDescription, children}) => {
  return <div
    className={styles.container}>
    <section className={styles.description}>
      <h3 className={styles.title}>{title}</h3>
      { description && <p>{description}</p>}
      { RenderedDescription && <RenderedDescription />}
    </section>
    {children}
  </div>
}


export default ProjectSection; 