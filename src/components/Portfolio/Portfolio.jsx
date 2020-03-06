import React, { Component } from 'react';
import styles from './styles.module.scss';
import PageHeader from '../PageHeader/PageHeader';
import CodepenSamples from 'components/CodepenSamples/CodepenSamples';
import ProjectSection from '../ProjectSection/ProjectSection';

class Portfolio extends Component {
  render() {
    return (
      <>
        <PageHeader description="A few web snippets and projects I enjoyed making.">
          Code
        </PageHeader>
        <div className={styles.samples}>
          <CodepenSamples />
          <ProjectSection title="Virtual Couch Gaming" renderDescription={() => (
            <>
              <span>
                A proof of concept multiplayer game using your mobile phone as gamepads. Play locally or remote! Check it out <a href="https://tingchen.me/pong-client/">here!</a></span>
            </>
          )}>
            <video autoPlay={true} className={styles.pongVideo} loop={true}>
              <source src="https://s3-us-west-1.amazonaws.com/tingchen.me/demo/pong-demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </ProjectSection>
        </div>
      </>
    );
  }
}

export default Portfolio;
