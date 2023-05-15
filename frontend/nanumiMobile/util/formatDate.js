export const convertDate = date => {
  const [datePart, meridian, hour, minute, second, millisecond] =
    date.split(/[\s:]+/);
  const year = parseInt(datePart.substring(0, 4), 10);
  const month = parseInt(datePart.substring(5, 7), 10) - 1;
  const day = parseInt(datePart.substring(8, 10), 10);
  let hourInt = parseInt(hour, 10);
  if (meridian === 'PM' && hourInt !== 12) {
    hourInt += 12;
  } else if (meridian === 'AM' && hourInt === 12) {
    hourInt = 0;
  }

  const convertDate = new Date(
    year,
    month,
    day,
    hourInt,
    minute,
    second,
    millisecond,
  );

  return convertDate;
};
