// Calculate difference b/w two dates in months.
function getMonthDifference(startDate, endDate) {
  return Math.abs(
    endDate.getMonth() -
      startDate.getMonth() +
      12 * (endDate.getFullYear() - startDate.getFullYear())
  );
}

// Calculate difference b/w two dates in years and months.
function diffYearMonth(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const time = (start.getTime() - end.getTime()) / 1000;
  const days = Math.abs(Math.round(time / (3600 * 24)));
  let months = getMonthDifference(start, end);
  let years = 0;
  while (true) {
    if (months > 12) {
      ++years;
      months = months - 12;
    }
    if (months < 12) break;
  }

  const yearsStr =
    years !== 0 ? `${years} ${years !== 1 ? 'years' : 'year'}` : null;
  const monthsStr =
    months !== 0 ? `${months} ${months !== 1 ? 'months' : 'month'}` : null;
  const resultStr =
    days > 31 ? `${yearsStr} ${monthsStr}` : 'Currently Working';
  return resultStr;
}

function convertStrToArr(str) {
  if (str) {
    const arr = str
      .split(' ')
      .map((elem) => elem.replace(/[",!@#$%&*\[\]]/g, ''))
      .filter((elem) => elem !== '');
    return arr;
  }
  return;
}

const selectOptions = (list) => {
  let options = [];
  list?.map((listItem) => {
    let arr = {
      value: listItem,
      label: listItem,
    };
    options.push(arr);
  });
  return options;
};

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export { diffYearMonth, convertStrToArr, selectOptions, formatBytes };
