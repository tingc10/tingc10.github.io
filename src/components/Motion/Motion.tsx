import React, { Component } from 'react';
import styles from './styles.module.scss';
import PageHeader from '../PageHeader/PageHeader';
import CodepenSamples from 'components/CodepenSamples/CodepenSamples';
import ProjectSection from '../ProjectSection/ProjectSection';

class Portfolio extends Component {
  render() {
    return (
      <div>
        <PageHeader description="Animated clips focusing on principles of animation. Created when I took the Animation Bootcamp course by School of Motion.">
          Motion
        </PageHeader>
        <div className={styles.samples}>
          
        </div>
      </div>
    );
  }
}

export default Portfolio;
