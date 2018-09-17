import classnames from 'classnames';

export function classNameHelper() {
  return function (...classnamesParams) {
    const props = this ? this.props : {};
    const className = props.className;
    let elementClassName = '';

    if (className) {
      elementClassName += ` ${className}`;
    }

    if (classnamesParams.length) {
      elementClassName += ` ${classnames(...classnamesParams)}`;
    }

    return elementClassName;
  };
}

export default classNameHelper;
