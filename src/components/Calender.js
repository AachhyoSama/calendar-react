import React, { useState } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const today = new Date();

    const getMonthDays = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();

        // first day of the current month
        const firstDay = new Date(year, month, 1).getDay();

        // last date or day of the current month
        const lastDate = new Date(year, month + 1, 0).getDate();

        let days = [];
        for (let i = 0; i < firstDay; i++) {
            // for days in current month not starting from Sunday
            days.push(null);
        }
        for (let i = 1; i <= lastDate; i++) {
            days.push(new Date(year, month, i));
        }

        return days;
    };

    const handlePrevMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
        );
    };

    const handleNextMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
        );
    };

    const handleDateClick = (date) => {
        if (date) {
            alert(`Clicked Date: ${date.toDateString()}`);
            // date information: day, date, month, year
            console.log({
                day: date.getDay(),
                date: date.getDate(),
                month: date.getMonth(),
                year: date.getFullYear(),
            });
        }
    };

    const handleMonthChange = (event) => {
        const selectedMonth = parseInt(event.target.value);
        setCurrentDate(new Date(currentDate.getFullYear(), selectedMonth, 1));
    };

    const isToday = (date) => {
        return (
            date &&
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    const days = getMonthDays(currentDate);

    return (
        <div className="calendar">
            <div className="calendar-header">
                {/* Button to navigate to the previous month */}
                <button onClick={handlePrevMonth}>{"Previous"}</button>

                {/* Dropdown to select the month */}
                <select
                    value={currentDate.getMonth()}
                    onChange={handleMonthChange}
                >
                    {monthNames.map((month, index) => (
                        <option key={index} value={index}>
                            {month}
                        </option>
                    ))}
                </select>

                <span>
                    <b>{currentDate.getFullYear()}</b>
                </span>

                {/* Button to navigate to the next month */}
                <button onClick={handleNextMonth}>{"Next"}</button>
            </div>

            <div className="calendar-grid">
                {daysOfWeek.map((day) => (
                    <div key={day} className="calendar-day">
                        {day}
                    </div>
                ))}
                {days.map((date, index) => (
                    <div
                        key={index}
                        className={`calendar-cell ${date ? "active" : ""} ${
                            isToday(date) ? "today" : ""
                        }`}
                        onClick={() => handleDateClick(date)}
                    >
                        {date && date.getDate()}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
