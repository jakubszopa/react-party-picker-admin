import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import SingleMonth from './SingleMonth';
import { AppProvider } from './DaysContext';

function App() {
  const [calendarMode, setCalendarMode] = useState('can-go');
  const [date, setDate] = useState({ totalDates: new Date() });

  const todayDate = new Date();

  const dateFormatedToString = (dateValue) => {
    return dateValue.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const checkingDate = new Date(2022, 5, 0);

  // useEffect(() => {
  //   console.log(dateFormatedToString(todayDate));
  //   console.log(checkingDate);
  // },[])

  const handleCalendarModeChange = (mode) => {
    console.log(mode);
    setCalendarMode(mode);
  };

  return (
    <AppProvider>
      <article className='calendar-container'>
        <div className='calendar-flex'>
          <p className='calendar-desc'>
            Siema! Zaznacz daty które Tobie pasują i te w króre nie jesteś w
            stanie przyjechać. Po analizie wszystkich danych wybiorę najlepszy
            termin, żeby każdy mógł przyjść.
          </p>
          <div className='calendar'>
            <SingleMonth month={6} calendarMode={calendarMode} />
            <SingleMonth month={7} calendarMode={calendarMode} />
            <SingleMonth month={8} calendarMode={calendarMode} />
          </div>
          <div className='legend-container'>
            <ul className='legend'>
              <li>
                <div className='color can-go'></div>Mogę na 90% / 100%
              </li>
              <li>
                <div className='color cant-go'></div>Może będę mógł/mogła (50%)
              </li>
              <li>
                <div className='color maybe'></div>Na pewno nie mogę
              </li>
              <li>
                <div className='color grey'></div>Nie mam pojęcia (zbyt odległa
                data etc.)
              </li>
            </ul>
            <div className='input-data'>
              <label htmlFor='calendar-mode'>Zmień opcje</label>
              <select className='calendar-dropdown'
                name='calendar-mode'
                id='calendar-mode'
                onChange={(e) => {
                  handleCalendarModeChange(e.target.value);
                }}
              >
                <option defaultValue='selected' value='can-go'>
                  Mogę na 90% / 100%
                </option>
                <option value='maybe'>Może będę mógł/mogła (50%)</option>
                <option value='cant-go'>Na pewno nie mogę</option>
              </select>
            </div>
          </div>
        </div>
      </article>
    </AppProvider>
  );
}

export default App;
