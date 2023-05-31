import _ from 'lodash';

const defaults = {
  field: {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
  },
  section: {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 24,
  },
};

const getSpans = (config, type) => {
  let spans = { ...defaults[type] };
  if (!config) return spans;
  if (_.isPlainObject(config)) {
    if (!_.isNil(config.xs)) spans.xs = config.xs;
    if (!_.isNil(config.sm)) spans.sm = config.sm;
    if (!_.isNil(config.md)) spans.md = config.md;
    if (!_.isNil(config.lg)) spans.lg = config.lg;
    if (!_.isNil(config.xl)) spans.xl = config.xl;
  }
  if (_.isNumber(config)) {
    spans = _.mapValues(spans, v => config);
  }
  return spans;
};

export default {
  getSpans,
};
