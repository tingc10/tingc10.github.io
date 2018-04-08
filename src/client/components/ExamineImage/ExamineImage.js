import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.sass';
import Image from 'Image/Image';

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
        <Image {...imageProps} />
      </div>
    );
  }
}
