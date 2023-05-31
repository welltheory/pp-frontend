import React from 'react';
import classNames from 'classnames';
import styles from './styles.modules.scss';

const Note = ({
  size,
  type,
  content,
  centered,
  children,
  className,
}) => {
  const classes = classNames(
    styles.note,
    styles[`note--${type}`],
    styles[`note--${size}`],
    { [styles['note--centered']]: centered },
    className,
  );
  return (
    <div className={classes} data-cy="note" data-note-type={type}>
      {children || content}
    </div>
  );
};

Note.defaultProps = {
  type: 'regular',
  size: 'medium',
  centered: false,
};

export default Note;
