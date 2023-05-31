import React from 'react';
import _ from 'lodash';
import { Helmet } from 'react-helmet';
import Config from '@config';

const SEO = (props) => {
  const {
    title,
    description,
  } = props;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="PairProgramming" />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

SEO.defaultProps = {
  title: 'PairProgramming',
  OGType: 'website',
  prerender: false,
};

export default SEO;
