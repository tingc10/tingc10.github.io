import React, { Component } from 'react';

import classNameHelper from 'utils/class-name-helper';

class Template extends Component {
  static propTypes = {}

  static defaultProps = {}

  getContainerClassName = classNameHelper()

  render() {
    return (
      <section className={this.getContainerClassName()} />
    );
  }
}

export default Template;
