import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export const getNowDateTimeInZone = (timeZone = 'Europe/Minsk') => {
  const now = toZonedTime(new Date(), timeZone);
  return {
    date: format(now, 'yyyy-MM-dd', { timeZone }),
    time: format(now, 'HH:mm', { timeZone }),
  };
};

export const getDateTimeFromISO = (isoString, timeZone = 'Europe/Minsk') => {
  const zoned = toZonedTime(new Date(isoString), timeZone);
  return {
    date: format(zoned, 'yyyy-MM-dd', { timeZone }),
    time: format(zoned, 'HH:mm', { timeZone }),
  };
};
