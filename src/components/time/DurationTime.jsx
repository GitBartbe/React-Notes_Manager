import { parseISO, intervalToDuration } from 'date-fns';

const DurationTime = ({ date, finishDate }) => {
  const parsedDate = parseISO(date);
  const parsedFinishDate = parseISO(finishDate);

  const duration = intervalToDuration({
    start: parsedDate,
    end: parsedFinishDate,
  });

  return (
    <>
      <h4>
        {duration.hours} h {duration.minutes} min
      </h4>
    </>
  );
};

export default DurationTime;
