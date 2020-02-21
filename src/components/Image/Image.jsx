import React, { Component } from 'react';
import PropTypes from 'prop-types'
import objectFitImages from 'object-fit-images';


class Image extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    title: PropTypes.string,
    objectFit: PropTypes.string,
  }

  static defaultProps = {
    objectFit: '',
  }

  componentDidMount() {
    objectFitImages(this.refs.image)
    this.configureObjectFit();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.objectFit !== this.props.objectFit) {
      this.configureObjectFit();
    }
  }

  configureObjectFit() {
    const { objectFit } = this.props;
    if (objectFit) {
      this.refs.image.style.setProperty('font-family', `object-fit: ${objectFit};`);
      objectFitImages(this.refs.image);
    }

  }

  render() {
    const { objectFit, style } = this.props;
    const customStyle = { ...style };
    if (objectFit) {
      customStyle.objectFit = objectFit;
    }
    const props = {
      alt: this.props.title,
      'aria-label': this.props.title,
      style: customStyle,
      ...this.props
    };
    return (
      <img ref='image' {...props} />
    );
  }
}

export default Image;
