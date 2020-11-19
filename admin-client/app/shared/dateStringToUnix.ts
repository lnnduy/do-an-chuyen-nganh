const datetimeStringToUnix = (datetimeString: string) => {
  const [timeString, dateString] = datetimeString.split(' ');
  const [hours, minutes] = timeString.split(':').map((str) => +str);
  let [date, month, year] = dateString.split('/').map((str) => +str);
  month -= 1;
  const dateObj = new Date(year, month, date, hours, minutes);
  return dateObj.getTime();
};

export default datetimeStringToUnix;
