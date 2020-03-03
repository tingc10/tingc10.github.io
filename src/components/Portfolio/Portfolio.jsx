import React, { Component } from 'react';

import { codepenSamples } from 'assets/misc/codepen-samples';
import CodepenEmbed from 'components/CodepenEmbed/CodepenEmbed';
import styles from './styles.module.scss';
import PageHeader from '../PageHeader/PageHeader';

class Portfolio extends Component {
  renderCodepenSamples() {
    return codepenSamples.map((sample, index) => {
      const {
        title,
        slugHash,
        description,
      } = sample;
      const props = { title, slugHash };

      return (
        <div
          className={styles.penContainer}
          key={index}>
          <section className={styles.penDescription}>
            <h3>{title}</h3>
            <p>{description}</p>
          </section>
          <CodepenEmbed
            {...props}
            className={styles.pen} />
        </div>
      );
    });
  }

  render() {
    return (
      <section className={styles.container}>
        <PageHeader description="A few web snippets and projects I enjoyed making.">
          Code
        </PageHeader>
        <div className={styles.pens}>
          {this.renderCodepenSamples()}
        </div>
      </section>
    );
  }
}

export default Portfolio;
