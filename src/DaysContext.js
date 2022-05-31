import datesReducer from "./datesReducer";
import React, { useContext, useEffect, useReducer } from "react";

const AppContext = React.createContext();

const today = [
    {date: new Date(2022, 7, 8), mode: 'today'}
];

const initialState = {
    user: 'Jan Kowalski',
    days: today,
  }
  
  const AppProvider = ({ children }) => {
  
    const clearDates = () => {
      dispatch({type:'CLEAR_DATES'})
    }
  
    const remove = (date) => {
      dispatch({type: 'REMOVE',payload: {date: date}})
    }
  
    const addDate = (date, mode) => {
      dispatch({type: 'ADD', payload: {date: date, mode: mode}})
    }

    const [dates, dispatch] = useReducer(datesReducer, initialState);

    useEffect(() => {
        console.log(dates);
    }, [])
  
    return (
      <AppContext.Provider
        value={{
          dates,
          clearDates,
          remove,
          addDate,
        }}
      >
        {children}
      </AppContext.Provider>
    )
  }
  // make sure use
  export const useDaysContext = () => {
    return useContext(AppContext)
  }
  
  export { AppContext, AppProvider }
  