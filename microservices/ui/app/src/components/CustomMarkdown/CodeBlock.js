import PropTypes from 'prop-types';
import React from 'react';


class CodeBlock extends React.Component {
  componentDidMount() {
    this.highlightCode();
  }

  componentDidUpdate() {
    this.highlightCode();
  }

  highlightCode() {
    const hljs = window.hljs;
    hljs.highlightBlock(this.refs.code);
  }

  render() {
    return (
      <pre>
        <code ref="code" className={this.props.language}>
          {this.props.value}
        </code>
      </pre>
    );
  }
}

CodeBlock.propTypes = {
  value: PropTypes.string,
  language: PropTypes.string
};

export default CodeBlock;
