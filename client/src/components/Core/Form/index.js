import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import * as HOCs from '@hocs';
import LoadingOverlay from '../Overlay/Loading';
import Sections from './Sections';
import Fields from './Fields';
import Footer from './Footer';
import styles from './styles.modules.scss';

const Form = HOCs.compose(
  HOCs.withProps(props => ({
    ...props,
    withPagination: !!props.pages,
  })),
  HOCs.withState('state', 'setState', (props) => {
    const { withPagination } = props;
    const currentPage = withPagination ? 0 : null;
    return {
      submitLoading: false,
      currentPage,
    };
  }),
  HOCs.withProps(props => {
    const { pages, withPagination, state: { currentPage } } = props;
    const result = { ...props };
    if (withPagination) {
      result.page = pages[currentPage];
      result.isStartPage = currentPage === 0;
      result.isLastPage = pages.length - 1 === currentPage;
    }
    return result;
  }),
  HOCs.withHandlers({
    changePage: props => (value) => {
      const {
        pages,
        withPagination,
        state: { currentPage },
        setState,
      } = props;
      if (!withPagination) return;
      const nextPage = currentPage + value;
      const isValidPage = nextPage >= 0 && nextPage < pages.length;
      if (!isValidPage) return currentPage;
      setState(s => ({ ...s, currentPage: nextPage }));
      return nextPage;
    },
    handleSubmit: props => async () => {
      const {
        setState,
        onSubmit,
      } = props;
      if (!onSubmit) return;
      setState(s => ({ ...s, submitLoading: true }));
      await onSubmit();
      setState(s => ({ ...s, submitLoading: false }));
    },
  }),
  HOCs.withHandlers({
    handleBackButton: props => async () => {
      const { changePage } = props;
      changePage(-1);
    },
    handlePrimaryButton: props => async () => {
      const {
        withPagination,
        isLastPage,
        changePage,
        handleSubmit,
      } = props;
      if (isLastPage || !withPagination) {
        handleSubmit();
        return;
      }
      changePage(1);
    },
  }),
)((props) => {
  const {
    children,
    className,
    hiddens,
    size,
    state,
    loadingOverlay,
  } = props;
  const { currentPage, submitLoading } = state;
  const classes = classNames(
    styles.form,
    { [styles['form--loading']]: submitLoading },
    { [styles[`form--${size}`]]: size },
    className,
  );
  const params = {
    className: classes,
    'data-cy': 'form',
    id: 'fform',
    'data-page': currentPage,
  };
  return (
    <div
      className={classes}
      data-cy="form"
      data-page={currentPage}
    >
      {loadingOverlay && submitLoading && <LoadingOverlay {...loadingOverlay} />}
      <Sections {...props} />
      {children}
      {!hiddens.actions && <Footer {...props} />}
    </div>
  );
});

Form.defaultProps = {
  sections: [],
  hiddens: {},
  size: 'default',
};

Form.Sections = Sections;
Form.Fields = Fields;

export default Form;
