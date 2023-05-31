import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import { Breadcrumb } from 'antd';
import { withRouter } from 'react-router-dom';
import Link from '../Link';
import styles from './styles.modules.scss';

const Helpers = {
  getSnippets: location => location.pathname.split('/')
    .filter(i => i),
  getBreadcrumbPath: (snippets, index) => {
    const joined = snippets.slice(0, index + 1).join('/');
    return `/${joined}`;
  },
  getBreadcrumbContent: props => (snippet, index) => {
    const { renderItem } = props;
    return renderItem(snippet, index);
  },
  getBreadcrumbItems: props => (snippets) => {
    const {
      hideItem,
      prefixItems,
      suffixItems,
    } = props;
    const defaultItems = snippets.map((snippet, index) => {
      if (hideItem(snippet, index)) return null;
      const path = Helpers.getBreadcrumbPath(snippets, index);
      const content = Helpers.getBreadcrumbContent(props)(snippet, index);
      return { path, content };
    });
    return [
      ...prefixItems,
      ...defaultItems,
      ...suffixItems,
    ].filter(Boolean);
  },
};

const Breadcrumbs = withRouter((props) => {
  const { location, className } = props;
  const classes = classNames(
    styles.breadcrubms,
    className,
  );
  const snippets = Helpers.getSnippets(location);
  const breadcrumbItems = Helpers.getBreadcrumbItems(props)(snippets);

  return (
    <Breadcrumb className={classes} data-cy="breadcrumbs">
      {breadcrumbItems.map((item, i) => {
        const { id: key = i, path, content } = item;
        return (
          <Breadcrumb.Item key={key}>
            <Link
              to={path}
              preserveSearch
            >
              {content}
            </Link>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
});

Breadcrumbs.defaultProps = {
  prefixItems: [], // Breadcrumb items to prefix (add at the fron)
  suffixItems: [], // Breadcrumb items to suffix (add at the end)
  hideItem: (snippet, index) => false, // Function to filter out breadcrumb items
  renderItem: (snippet, index) => _.capitalize(snippet), // How breadcrumb is displayed
};

export default Breadcrumbs;
