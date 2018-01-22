import React, { Component } from 'react';
import PropTypes from 'prop-types'
import objectFitImages from 'object-fit-images';


class Image extends Component {
  componentDidMount() {
    objectFitImages(this.refs.image)
  }
  render() {
    const props = Object.assign({
      alt: this.props.title,
      'aria-label': this.props.title,
    }, this.props)
    return (
      <img ref='image' {...props} />
    );
  }
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
}

export default Image;
