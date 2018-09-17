import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $script from 'scriptjs';
import classNameHelper from 'utils/class-name-helper';

class CodepenEmbed extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    slugHash: PropTypes.string.isRequired,
  }

  getContainerClassName = classNameHelper()

  componentDidMount() {
    if (window && window.__CPEmbed) {
      window.__CPEmbed();
    } else {
      $script('https://static.codepen.io/assets/embed/ei.js');
    }
  }

  render() {
    const {
      slugHash,
      title,
    } = this.props;

    return (
      <figure className={this.getContainerClassName()}>
        <p
          data-height="500"
          data-theme-id="dark"
          data-slug-hash={slugHash}
          data-default-tab="result"
          data-user="tingc10"
          data-pen-title={this.props.title}
          className="codepen">
          See the Pen<a href={`https://codepen.io/tingc10/pen/${slugHash}/`}>{this.props.title}</a> by Ting Chen (<a href="https://codepen.io/tingc10">@tingc10</a>) on <a href="https://codepen.io">CodePen</a>.
        </p>
      </figure>
    );
  }
}

export default CodepenEmbed;
