import PropTypes from 'prop-types';
import React from 'react';

const getUrlForm = (string) => {
  return string.toLocaleString().toLowerCase().replace(/[ "<>#%{}|\^~[\]`;/?:@=&]/g, '-');
};

class NavigableHeading extends React.Component {
  render() {
    const { children, level } = this.props;

    // Load local styles from component stylesheet
    const styles = require('./CustomMarkdown.scss');

    let ref = '';
    const title = children[0];
    if (title) {
      ref = getUrlForm(title);
    }

    const content = (
      <span>
        <a name={ref} className={styles.fixed_header_internal_link}/>
        {children}
      </span>
    );

    switch (level) {
      case 1:
        return (
          <h1>
            { content }
          </h1>
        );
      case 2:
        return (
          <h2>
            { content }
          </h2>
        );
      case 3:
        return (
          <h3>
            { content }
          </h3>
        );
      case 4:
        return (
          <h4>
            { content }
          </h4>
        );
      case 5:
        return (
          <h5>
            { content }
          </h5>
        );

      default:
        return (
          <h6>
            { content }
          </h6>
        );
    }
  }
}

NavigableHeading.propTypes = {
  level: PropTypes.number.isRequired,
  children: PropTypes.array.isRequired,
};
export default NavigableHeading;

export { getUrlForm };
