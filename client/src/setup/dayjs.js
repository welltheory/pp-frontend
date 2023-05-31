import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localeData from 'dayjs/plugin/localeData';
import minMax from 'dayjs/plugin/minMax';
import 'dayjs/locale/en';

const Dayjs = {
  setup: () => {
    const plugins = [
      localizedFormat,
      isBetween,
      isSameOrAfter,
      isSameOrBefore,
      utc,
      timezone,
      minMax,
      localeData,
    ];
    plugins.forEach(r => dayjs.extend(r));
    dayjs.locale('en');
  },
};

export default Dayjs;
