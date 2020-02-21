import React, { Component } from 'react';

import { codepenSamples } from 'assets/misc/codepen-samples';
import CodepenEmbed from 'components/CodepenEmbed/CodepenEmbed';
import styles from './styles.module.scss';

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
          <p className={styles.penDescription}>
            <h3>{title}</h3>
            <p>{description}</p>
          </p>
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
        <header className={styles.header}>
          <h1>
            Portfolio
          </h1>
        </header>
        <div className={styles.pens}>
          {this.renderCodepenSamples()}
        </div>
      </section>
    );
  }
}

export default Portfolio;
