import moment from 'moment';

import { MOMENT_FORMAT } from '../constants';

const addHours = (time, hour) => {
  return moment(time).add(hour, 'h');
};

const addHoursAndFormatHours = (time, hour) => {
  return moment(time).add(hour, 'h').format(MOMENT_FORMAT.HOURS);
};

const formatHours = (time) => {
  return moment(time).format(MOMENT_FORMAT.HOURS);
};

const formatDate = (date) => {
  return moment(date).format(MOMENT_FORMAT.DATE);
};

const formatTime = (time) => {
  return moment(time, `${MOMENT_FORMAT.HOURS}:${MOMENT_FORMAT.MINUTES}`);
};

const formatTimeReturnStr = (time) => {
  return moment(time).format(`${MOMENT_FORMAT.HOURS}:${MOMENT_FORMAT.MINUTES}`);
};

export {
  addHours,
  addHoursAndFormatHours,
  formatHours,
  formatDate,
  formatTime,
  formatTimeReturnStr,
};
