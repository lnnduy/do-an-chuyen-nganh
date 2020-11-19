const unixToDateString = (ticks: number) => {
  const dateObj = new Date(ticks);
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1 + '').padStart(2, '0');
  const date = (dateObj.getDate() + '').padStart(2, '0');
  const hours = (dateObj.getHours() + '').padStart(2, '0');
  const minutes = (dateObj.getMinutes() + '').padStart(2, '0');

  return `${hours}:${minutes} - ${date}/${month}/${year}`;
};

export default unixToDateString;
