import React from 'react';
import Moment from 'react-moment';

const FormatTime = ({ time, date, type = 'ddd, MMM Do' }) => {
  const parsedTime = time && JSON.parse(time);
  const parsedDate = date && JSON.parse(date);
  return (
    <>
      {time && (
        <span>
          <Moment format="hh:mma" parse="HH:mm:ss">
            {time && parsedTime.from}
          </Moment>
          -
          <Moment format="hh:mma" parse="HH:mm:ss">
            {time && parsedTime.to}
          </Moment>
        </span>
      )}
      {date && (
        <span>
          <Moment format={type} parse="YYYY-MM-DD">
            {date && parsedDate.date}
          </Moment>
        </span>
      )}
    </>
  );
};

export default FormatTime;