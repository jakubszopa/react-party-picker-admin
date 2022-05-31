const datesReducer = (state, action) => {
    if (action.type === 'CLEAR_DATES') {
      return { ...state, days: [] };
    }
    if (action.type === 'REMOVE') {
        console.log('removal')
      return {
        ...state,
        days: state.days.filter((item) => item.date.getTime() !== action.payload.date.getTime()),
      };
    }
    if (action.type === 'ADD') {
        // console.log('gete',action.payload.mode, action.payload.date,'here');
        // console.log(action.payload.date, action.payload.mode)
      
        let newDates = state.days;

        if (state.days.find(day => day.date.getTime() === action.payload.date.getTime())) {
            newDates = state.days.map((day) => {
                if (day.date.getTime() === action.payload.date.getTime()) {
                    return { ...day, mode: action.payload.mode }
                }
                return day;
            })
            
        } else {
            // console.log('------------------', newDates, '----------------------');
            newDates.push({date: action.payload.date, mode: action.payload.mode})
        }

        return { ...state, days: newDates };
    };
}
  export default datesReducer;