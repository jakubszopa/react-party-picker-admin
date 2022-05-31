import { useEffect } from "react";
import SingleDay from "./SingleDay";

const SingleMonth = ({month, calendarMode}) => {

    const stringMonth = (new Date(2022, month, 1)).toLocaleDateString('pl', {
        month: 'long',
    });

    const lastDay = (new Date(2022, month, 0)).getDate();

    const AllDaysInAMonth = Array.from(Array(lastDay).keys());  

    // useEffect(() => {
    //     console.log(mode);
    // },[])

    return <article className="single-month">
        <h2>{stringMonth}</h2>
        <ul className="weekdays">
            <li>P</li>
            <li>W</li>
            <li>Ś</li>
            <li>C</li>
            <li>P</li>
            <li>S</li>
            <li>N</li>
        </ul>
        <div className="days-container">
            {AllDaysInAMonth.map((day) => <SingleDay key={`${day} ${stringMonth}`} day={day+1} month={month} mode={calendarMode}/> )}
        </div>
    </article>
}

export default SingleMonth;