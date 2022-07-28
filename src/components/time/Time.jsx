import { format, parseISO } from 'date-fns';

const Time = ({ date = '2022-07-07T16:19:28.495Z', displayDate }) => {
  const parsedDate = parseISO(date);

  const formatedDate = format(parsedDate, 'MM.dd.yyyy');
  const formatHour = format(parsedDate, 'hh:mm aa');

  return (
    <div>
      <div className='note-data'>
        {displayDate && <h4>{formatedDate}</h4>}

        <h4>{formatHour}</h4>
      </div>
    </div>
  );
};

export default Time;
