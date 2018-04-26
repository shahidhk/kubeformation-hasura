import React from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';
import NavigableHeading from './NavigableHeading';

class CustomMarkdown extends React.Component {
  constructor() {
    super();
    this.state = { isCollapsed: false};
  }

  handleCollapseClick() {
    this.setState({ isCollapsed: !this.state.isCollapsed });
  }

  render() {
    const { markdown, title, collapsible } = this.props;
    const { isCollapsed } = this.state;

    const styles = require('./CustomMarkdown.scss');
    require('./GithubMarkdown.scss');

    let titleHtml = null;
    if (title) {
      titleHtml = (
        <div className={styles.section_description + ' ' + styles.bor_bottom}>
          {title}
        </div>
      );
    }

    let collapseBar = null;
    if (collapsible) {
      collapseBar = (
        <div onClick={this.handleCollapseClick.bind(this)} className={styles.collapse_footer}>
          <i className={ isCollapsed ? 'fa fa-chevron-down' : 'fa fa-chevron-up' } aria-hidden="true" />
        </div>
      );
    }

    const markdownView = (
      <div className={'markdown-body ' + styles.collapsible + (isCollapsed ? ' md-collapsed' : '') + (title ? ' ' + styles.add_padd_left + ' ' + styles.add_padd_right : '')}>
        <ReactMarkdown source={markdown} renderers={{heading: NavigableHeading, code: CodeBlock}} />
      </div>
    );

    return (
      <div>
        { titleHtml }
        { markdownView }
        { collapseBar }
      </div>
    );
  }
}

export default CustomMarkdown;
