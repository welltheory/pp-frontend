import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars as fasBars,
  faCalendarAlt as farCalendarAlt,
  faCalendarCheck as farCalendarCheck,
  faCode as farCode,
  faCopy as farCopy,
  faExclamationCircle as farExclamationCircle,
  faExternalLink as farExternalLink,
  faEye as farEye,
  faFile as farFile,
  faList as farList,
  faQrcode as farQrcode,
  faUser as farUser,
  faUserCircle as farUserCircle,
  faUserLock as farUserLock,
  faUserUnlock as farUserUnlock,
  faChevronLeft as farChevronLeft,
  faChevronsLeft as farChevronsLeft,
  faEllipsisV as farEllipsisV,
  faLockKeyhole as farLockKeyhole,
  faCircleCheck as farCircleCheck,
  faCalendar as farCalendar,
  faTimes as farTimes,
} from '@fortawesome/pro-regular-svg-icons';

const setup = () => {
  library.add(
    fasBars,
    farTimes,
    farCalendar,
    farCircleCheck,
    farLockKeyhole,
    farCalendarAlt,
    farChevronLeft,
    farChevronsLeft,
    farEllipsisV,
    farCalendarCheck,
    farCode,
    farCopy,
    farExclamationCircle,
    farExternalLink,
    farEye,
    farFile,
    farList,
    farQrcode,
    farUser,
    farUserCircle,
    farUserLock,
    farUserUnlock,
  );
};

const icons = {
  setup,
};

export default icons;
