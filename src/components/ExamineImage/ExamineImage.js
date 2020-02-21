import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.sass';
import Image from 'components/Image/Image';
import { TimelineMax, Power2 } from 'gsap';

const playTimeline = (timeline) => {
  return new Promise(((resolve) => {
    timeline.eventCallback('onComplete', () => resolve('Animation Complete'));
    timeline.play();
  }));
}

export default class ExamineImage extends Component {
  static propTypes = {
    image: PropTypes.shape({
      url: PropTypes.string,
      title: PropTypes.string,
    }),
  }

  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = { image: props.image };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.image !== prevProps.image) {
      this.loadNewImage();
    }
  }

  loadNewImage = () => {
    this.fadeOutPrevImage().then(() => {
      this.setState({
        image: this.props.image
      }, this.fadeInCurrentImage);
    });
  }

  fadeOutPrevImage = () => {
    const timeline = new TimelineMax({paused: true});
    const imageRef = this.imageRef.refs.image;
    timeline.to(imageRef, 0.3, { scale: 0.8, autoAlpha: 0, ease: Power2.easeOut } );
    return playTimeline(timeline);
  }

  fadeInCurrentImage = () => {
    const timeline = new TimelineMax({paused: true});
    const imageRef = this.imageRef.refs.image;
    timeline.to(imageRef, 0.5, { scale: 1, autoAlpha: 1, ease: Power2.easeOut } );
    return playTimeline(timeline);
  }

  render() {
    const {image} = this.state;
    const imageProps = {
      className: styles.image,
      src: image.url,
      title: image.title,
    };
    return (
      <div className={styles.imageContainer}>
        <Image ref={(node) => { this.imageRef = node; }} {...imageProps} />
      </div>
    );
  }
}
