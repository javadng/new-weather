const convertTime = (
  timeUnix,
  options = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  },
  locale = 'en-US'
) => {
  const time = new Intl.DateTimeFormat(locale, options).format(timeUnix * 1000);

  return time;
};

export default convertTime;
