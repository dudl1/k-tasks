// CHECK LEAP YEAR 
isLeapYear = (year)=>
{
    return (year % 4 == 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
}

getFebDays = (year)=>
{
    return isLeapYear(year) ? 29 : 28
}

let calendar = document.querySelector(".calendar");
const montNames = ["Января", "Февраля",
"Марта", "Апреля", "Мая", "Июня", "Июля", "Августа",
"Сентября", "Октября", "Ноября", "Декабря"];
let monthPicker = document.querySelector("#month-picker");
monthPicker.onclick = ()=>
{
    monthList.classList.add("show");
}

generateCalendar = (month, year)=>
{
    let calendarDays = document.querySelector(".calendar-days");
    calendarDays.innerHTML = ' ';
    let calendarHeaderYear = document.querySelector("#year");

    let daysOfMonth = [31, getFebDays(year), 31, 30, 31, 30, 31,
    30, 31, 30, 31, 30];

    let currDate = new Date();

    monthPicker.innerHTML = montNames[month];
    calendarHeaderYear.innerHTML = year;

    let firstDay = new Date(month, year, 1);

    for (let i = 0; i <= daysOfMonth[month] + firstDay.getDay() - 1; i++)
    {
        let day = document.createElement("div");
        if (i >= firstDay.getDay())
        {
            day.classList.add("calendar-day-hover");
            day.innerHTML = i - firstDay.getDay() + 1;

            if (i - firstDay.getDay() + 1 == currDate.getDate() && year ===
            currDate.getFullYear() && month === currDate.getMonth())
            {
                day.classList.add("curr-date");
            }
        }
        calendarDays.appendChild(day);
    }
}

let monthList = calendar.querySelector(".month-list");

montNames.forEach((e, index)=>
{
    let month = document.createElement("div");
    month.innerHTML = `<div>${e}</div>`;
    month.onclick = ()=>
    {
        monthList.classList.remove("show");
        currMonth.value = index;
        generateCalendar(currMonth.value, currYear.value);
    }
    monthList.appendChild(month);
})

let ewq = document.querySelectorAll(".year-change");
for (let ytw = 0; ytw < ewq.length; ytw++)
{
    const el = ewq[ytw];
    el.onclick = ()=>
    {
        let attrBtnCalendar = el.attributes.id.nodeValue;
        if (attrBtnCalendar == "will-year")
        {
            ++currYear.value;
            generateCalendar(currMonth.value, currYear.value);
        } else {
            --currYear.value;
            generateCalendar(currMonth.value, currYear.value);
        }
    }
}

let currDate = new Date();

let currMonth = {value: currDate.getMonth()};
let currYear = {value: currDate.getFullYear()};

generateCalendar(currMonth.value, currYear.value);