import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import SingleMonth from './SingleMonth';
import testData from './test-data.json';

const initialState = testData['user-data'];

function App() {

  const [singleDayData, setSingleDayData] = useState([]);
  const [singleDayDataIsShown, setSingleDayDataIsShown] = useState(false);

  const singleDay = testData['user-data'][0].dates[0];

  const allDates = testData['user-data'].reduce((dates, currentUser) => {
    for ( const date of currentUser.dates ) {
      dates.push({date});
    }
    return dates
  }, []);

  const allDaysScores = allDates.reduce((singleDayScore, currDate) => {

    let dateScore = 0;

    if (currDate.date.mode === 'can-go') {
      dateScore = dateScore + 2;
    } else if (currDate.date.mode === 'cant-go') {
      dateScore = dateScore - 2;
    } else if (currDate.date.mode === 'maybe') {
      dateScore = dateScore + 1;
    }

    const dayName = currDate.date.date;

    if (singleDayScore[`${dayName}`]) {
      singleDayScore[`${dayName}`] = singleDayScore[`${dayName}`] + dateScore;
    } else {
      singleDayScore[`${dayName}`] = dateScore;
    }

    return singleDayScore
  }, {});

  const highestScore = Math.max(...(Object.values(allDaysScores)));
  const lowestScore = Math.min(...(Object.values(allDaysScores)));

  const showSingleDayData = (data) => {
    if (data.length > 0) {
      setSingleDayData(data);
      setSingleDayDataIsShown(true);
    } else {
      setSingleDayDataIsShown(false);
    }
  };

  return (
    <article className='calendar-container'>
      <div className='calendar-flex'>
        <div className='calendar'>
          <SingleMonth
            month={6}
            testData={testData}
            maxMinScore={{highestScore, lowestScore}}
            showSingleDayData={showSingleDayData}
          />
          <SingleMonth
            month={7}
            testData={testData}
            maxMinScore={{highestScore, lowestScore}}
            showSingleDayData={showSingleDayData}
          />
          <SingleMonth
            month={8}
            testData={testData}
            maxMinScore={{highestScore, lowestScore}}
            showSingleDayData={showSingleDayData}
          />
        </div>
        <div className='single-day-data'>
          {singleDayDataIsShown && <h4>{(new Date(singleDayData[0].dateAndMode.date)).toLocaleString('pl', {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'})}</h4> }
          {singleDayDataIsShown &&
            singleDayData.map((item) => {
              return (
                <div className='single-user' key={item.user}>
                  <div className={`color ${item.dateAndMode.mode}`}></div>{' '}
                  {item.user} {`${item.dateAndMode.mode === 'can-go' ? 'może' : ''} ${item.dateAndMode.mode === 'cant-go' ? 'nie może' : ''} ${item.dateAndMode.mode === 'maybe' ? 'możliwe że będzie mógł/mogła' : ''} przyjść`}
                </div>
              );
            })}
        </div>
      </div>
    </article>
  );
}

export default App;
