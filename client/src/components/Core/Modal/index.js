import React from 'react';
import _ from 'lodash';
import { Modal as AntModal } from 'antd';
import classNames from 'classnames';
// import Events from '@utils/events';
import PromptConfirmation from './PromptConfirmation';
import TimeoutConfirmation from './TimeoutConfirmation';
import styles from './styles.modules.scss';

const ConfirmHelpers = {
  getContent: params => (props) => {
    const { confirmMethod, content } = params;
    if (confirmMethod === 'prompt') {
      return <PromptConfirmation {...params} {...props} />;
    }
    if (confirmMethod === 'timeout') {
      return <TimeoutConfirmation {...params} {...props} />;
    }
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  },
  getUpdateProps: params => {
    const { confirmMethod } = params;
    if (confirmMethod === 'prompt') {
      return {
        okButtonProps: {
          disabled: true,
        },
      };
    }
    if (confirmMethod === 'prompt') {
      return {};
    }
    return {};
  },
  // mountListeners: (params) => {
  //   const { confirmMethod, confirmParams = {} } = params;
  //   if (!confirmMethod) return;
  //   const { listenerKey } = confirmParams;
  //   const key = listenerKey || DefaultListenersKeys[confirmMethod];
  //   if (!key) return;
  //   Events.addListener(key);
  // },
};

const confirm = (params) => {
  const modal = AntModal.confirm({ maskClosable: true, ...params });
  const content = ConfirmHelpers.getContent(params)({ modal });
  const updateProps = ConfirmHelpers.getUpdateProps(params);
  modal.update({
    ...updateProps,
    content,
  });
  return modal;
};

const Root = (props) => {
  const {
    children,
    wrapClassName,
    padding,
    ...params
  } = props;
  const wrapClasses = classNames(
    styles.modal,
    padding && [styles[`modal--padding-${padding}`]],
    wrapClassName,
  );
  return (
    <AntModal
      destroyOnClose
      width={620}
      {...params}
      wrapClassName={wrapClasses}
      centered
    >
      {children}
    </AntModal>
  );
};

Root.defaultProps = {
  padding: null,
  title: null,
  footer: null,
};

const Modal = {
  Root,
  confirm,
};


export default Modal;
