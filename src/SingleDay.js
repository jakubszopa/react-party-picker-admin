import { useEffect, useRef, useState } from 'react';
import { useDaysContext } from './DaysContext';

const SingleDay = ({ day, mode, month }) => {
  const startingWeekDay = new Date(2022, month, 1).getDay();
  const currentDate = new Date(2022, month, day);

  const [buttonMode, setButtonMode] = useState('blank');

  const { addDate, remove,  dates } = useDaysContext();
  const dayRef = useRef(null);

  const handleDateInput = (inputDay, inputMonth) => {

        if (dates.days.find((day) => day.date.getTime() === currentDate.getTime() && day.mode === mode)) {
            remove(new Date(2022, inputMonth, inputDay));
            setButtonMode(`blank ${currentDate.getTime() === (new Date(2022, 7, 8)).getTime() ? 'today' : '' }`);
        } else {
            addDate(new Date(2022, inputMonth, inputDay), mode);
            setButtonMode(mode);
        }

        console.log(dates);
  };

    useEffect(() => {
    // console.log(dates);
    for (const day of dates.days) {
        if (day.date.getTime() === currentDate.getTime()) {
            if (currentDate.getTime() === (new Date(2022, 7, 8)).getTime()) {
                setButtonMode(`today ${day.mode}`);
            } else {
                setButtonMode(day.mode);
            }
        }
    }

  }, [dates]);

  useEffect(() => {
    if (day === 1) {
      dayRef.current.style.gridColumn = startingWeekDay;
    }
    // console.log(currentDate);
  }, []);

  return (
    <button
      className={`day ${buttonMode}`}
      ref={dayRef}
      onClick={() => {
        handleDateInput(day, month);
      }}
    >
      {day}
    </button>
  );
};

export default SingleDay;
