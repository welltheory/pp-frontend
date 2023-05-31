import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Button from '../../Button';
import Pagination from '../Pagination';
import styles from './styles.modules.scss';

const Appearance = {
  isPrimaryDisabled: (props) => {
    const { withPagination, appearance, page } = props;
    if (withPagination && page.validate) return !page.validate();
    return _.get(appearance, 'primary.disabled', false);
  },
  getPrimaryText: (props) => {
    const {
      appearance,
      withPagination,
      isLastPage,
    } = props;
    if (withPagination && !isLastPage) return 'Next';
    return _.get(appearance, 'primary.text', 'Submit');
  },
  getPrimary: (props) => {
    const {
      appearance,
      size,
      handlePrimaryButton,
      state: { submitLoading },
    } = props;
    return {
      cy: 'primary',
      fill: _.get(appearance, 'primary.fill', 'full'),
      size: _.get(appearance, 'primary.size', size),
      hidden: _.get(appearance, 'primary.hidden', false),
      disabled: Appearance.isPrimaryDisabled(props),
      text: Appearance.getPrimaryText(props),
      onClick: handlePrimaryButton,
      loading: submitLoading || _.get(appearance, 'primary.loading', false),
    };
  },
};

const Footer = (props) => {
  const {
    handleBackButton,
    isStartPage,
    withPagination,
  } = props;
  const showBackButton = withPagination && !isStartPage;
  const classes = classNames(
    styles.footer,
    { [styles['footer--with-pagination']]: withPagination },
  );
  const { text: primaryText, ...primaryProps } = Appearance.getPrimary(props);
  return (
    <div className={classes} data-cy="form-footer">
      <div className={styles.left}>
        <Pagination {...props} />
      </div>
      <div className={styles.right}>
        {showBackButton && (
          <Button
            cy="blank"
            type="dark"
            fill="none"
            size="small"
            onClick={handleBackButton}
          >
            Back
          </Button>
        )}
        <Button {...primaryProps}>
          {primaryText}
        </Button>
      </div>
    </div>
  );
};

export default Footer;
