const datesReducer = (state, action) => {
    if (action.type === 'CLEAR_DATES') {
      return { ...state, days: [] };
    }
    if (action.type === 'REMOVE') {
      return {
        ...state,
        days: state.days.filter((item) => item.date !== action.payload.date),
      };
    }
    if (action.type === 'ADD') {
        // console.log('gete',action.payload.mode, action.payload.date,'here');
        // console.log(action.payload.date, action.payload.mode)
        let tempDates

        for (const day of state.days) {
            console.log( action.payload);
            if (day.date.getTime() === action.payload.date.getTime() ) {
                console.log('powtorka')
                tempDates = state.days.map((item) => {
                    if (item.date.getTime() === action.payload.date.getTime() && action.payload.mode !== 'blank') {
                        return {
                            ...item,
                            mode: 'blank',
                        };
                    } else if (item.date.getTime() === action.payload.date.getTime() && action.payload.mode === 'blank') {
                        return {
                            ...item,
                            mode: action.payload.mode,
                        }
                    } else {
                        console.log('notin');
                        return {
                            ...item
                        }
                    }
                });
            }
        }
        if (state.days.find(day => day.date.getTime() === action.payload.date.getTime()))
      console.log({ ...state, days: tempDates})
      console.log(tempDates)
      return { ...state, days: tempDates};
    }
    return state;
  };
  
  export default datesReducer;
  