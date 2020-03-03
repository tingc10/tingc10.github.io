import React, { Component } from 'react';
import styles from './styles.module.scss';
import PageHeader from '../PageHeader/PageHeader';
import CodepenSamples from 'components/CodepenSamples/CodepenSamples';

class Portfolio extends Component {
  render() {
    return (
      <section className={styles.container}>
        <PageHeader description="A few web snippets and projects I enjoyed making.">
          Code
        </PageHeader>
        <div className={styles.samples}>
          <CodepenSamples />
        </div>
      </section>
    );
  }
}

export default Portfolio;
