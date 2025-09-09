import { formatInTimeZone } from 'date-fns-tz';

const dateTimeUtc = (iso) => {
  const timeZone = 'Europe/Minsk';
  const dateObj = new Date(iso);

  if (isNaN(dateObj)) {
    console.error('Invalid date:', iso);
    return { date: '', time: '' };
  }

  return {
    date: formatInTimeZone(dateObj, timeZone, 'dd.MM.yy'),
    time: formatInTimeZone(dateObj, timeZone, 'HH:mm'),
  };
};

export default dateTimeUtc;
