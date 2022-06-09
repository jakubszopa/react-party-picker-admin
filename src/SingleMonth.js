import { useEffect } from 'react';
import SingleDay from './SingleDay';

const SingleMonth = ({ month, testData, showSingleDayData, maxMinScore }) => {
  const stringMonth = new Date(2022, month, 1).toLocaleDateString('pl', {
    month: 'long',
  });

  const lastDay = new Date(2022, month, 0).getDate();

  const AllDaysInAMonth = Array.from(Array(lastDay).keys());

  const singleMonthData = testData['user-data'].reduce((allDates, currentUser) => {

    for ( let i = 0; i < currentUser.dates.length; i++) {
        if (new Date(currentUser.dates[i].date).getMonth() === month) {
            allDates.push({dateAndMode: currentUser.dates[i], user: currentUser.name});
        }
    }
    return allDates;
  }, []);

//   console.log(singleMonthData)

//   useEffect(() => {
//     console.log((new Date(singleMonthData[0].dateAndMode.date)).getDay())
//   })

  return (
    <article className='single-month'>
      <h2>{stringMonth}</h2>
      <ul className='weekdays'>
        <li>P</li>
        <li>W</li>
        <li>Ś</li>
        <li>C</li>
        <li>P</li>
        <li>S</li>
        <li>N</li>
      </ul>
      <div className='days-container'>
        {AllDaysInAMonth.map((day) => (
          <SingleDay
            key={`${day} ${stringMonth}`}
            day={day + 1}
            month={month}
            maxMinScore={maxMinScore}
            data={singleMonthData.reduce((allDates, currentDate) => {
                if (new Date(currentDate.dateAndMode.date).getDate() === day + 1) {
                    allDates.push(currentDate);
                    // console.log(currentDate);
                }
                return allDates;
            }, []
            )}
            showSingleDayData={showSingleDayData}
          />
        ))}
      </div>
    </article>
  );
};

export default SingleMonth;
