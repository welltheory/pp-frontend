import React from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { Container } from '@components/Core';
import styles from './styles.modules.scss';

const Footer = (props) => {
  const classes = classNames(
    styles.footer,
  );
  return (
    <div className={classes}>
      <Container fullOnMobile>
        <div className={styles.copyright}>
          @{dayjs().year()} <b>@PairProgramming</b>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
