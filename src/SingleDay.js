import { useEffect, useRef } from 'react';

const SingleDay = ({ day, month, data, showSingleDayData, maxMinScore }) => {

  const dayRef = useRef(null);
  const startingWeekDay = new Date(2022, month, 1).getDay();

  let score = 0;

  const calculateDayScore = () => {
    if (data) {
      for (const item of data) {
        if (item.dateAndMode.mode === 'can-go') {
          score = score + 2;
        } else if (item.dateAndMode.mode === 'cant-go') {
          score = score - 2;
        } else if (item.dateAndMode.mode === 'maybe') {
          score = score + 1;
        }
      }
    }
  }

  useEffect(() => {
    if (score > 0) {
      dayRef.current.style.backgroundColor = `rgba(0, 150, 255, ${score/(maxMinScore.highestScore)} )`;
    }

    if (score < 0) {
      dayRef.current.style.backgroundColor = `rgba(255, 160, 122, ${score/(maxMinScore.lowestScore)} )`;
    }

    if (day === 1) {
      dayRef.current.style.gridColumn = startingWeekDay;
    }
    // console.log(currentDate);
  }, []);

  calculateDayScore();

  return <button ref={dayRef} onClick={() => {showSingleDayData(data)}} className='day'>{day}</button>;
};

export default SingleDay;
