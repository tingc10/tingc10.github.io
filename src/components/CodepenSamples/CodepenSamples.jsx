import React from 'react';
import CodepenEmbed from 'components/CodepenEmbed/CodepenEmbed';
import styles from './styles.module.scss';
import ProjectSection from '../ProjectSection/ProjectSection';

const CodepenSamples = ({
  codepenSamples
}) => {
  return codepenSamples.map((sample) => {
    const {
      fields: {
        title,
        contentMeta: {
          slugHash
        },
        description,
      }
    } = sample;
    const penProps = { title, slugHash };
    const projectSectionProps = {
      key: slugHash,
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

export default CodepenSamples;
