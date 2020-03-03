import React from 'react';
import { codepenSamples } from 'assets/misc/codepen-samples';
import CodepenEmbed from 'components/CodepenEmbed/CodepenEmbed';
import styles from './styles.module.scss';
import ProjectSection from '../ProjectSection/ProjectSection';

export default function CodepenSamples() {
  return codepenSamples.map((sample, index) => {
    const {
      title,
      slugHash,
      description,
    } = sample;
    const penProps = { title, slugHash };
    const projectSectionProps = {
      key: index,
      description,
      title
    }

    return (
      <ProjectSection {...projectSectionProps}>
        <CodepenEmbed
          {...penProps}
          className={styles.pen} />
      </ProjectSection>
    );
  });
}
