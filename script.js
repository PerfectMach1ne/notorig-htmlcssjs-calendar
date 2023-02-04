const currentDate = document.querySelector(".current-date"),
daysTag = document.querySelector(".days"),
prevNextIcon = document.querySelectorAll(".icons span");

// Getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();
currDay = date.getDay();

console.log(date, currYear, currMonth);

const months = ["January", "February", "March", "April", "Gay", "June", "July",
                "August", "September", "October", "November", "December"]

const renderCalendar = () => {
  let firstDayOfMonth = new Date(currYear, currMonth, 0).getDay(), // getting the first day of month; also had to set it to 0 because otherwise JS dates were incorrectly offest from weekdays in the disgusting United Steakian way (FUCK american calendars.)
  lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(), // Getting the last date of month
  lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate(), // Getting the last date of previous month
  lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay(); // Getting the last day of month

  console.log(lastDateOfMonth);
  let liTag = "";
  
  for (let i = firstDayOfMonth; i > 0; i--) { // creating li of previous month last days
    liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
  }

  for (let i = 0; i < lastDateOfMonth; i++) { // creating li of all days of current month
    // adding active class to li if the current day, month and year matched
    let isToday = i === date.getDate() - 1 && currMonth === new Date().getMonth()
                  && currYear === new Date().getFullYear() ? "active" : ""; // changing date.getDate() to date.getDate() - 1 is what fixed the bug with tomorrow being highlighted instead!
    // Also fun fact: getDate() returns the day of the month ([0,31]), while getDay() returns the day of the week ([0,6]). LOL
    liTag += `<li class="${isToday}">${i + 1}</li>`;
  }

  for (let i = lastDayOfMonth; i < 7; i++) { // creating li of next month first days
    liTag += `<li class= "inactive">${i - lastDayOfMonth + 1}</li>`;
  }
  
  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => {
  icon.addEventListener("click", () => {  // adding click event on both icons
    console.log(icon);
    // if clicked icon is previous icon then decrement current month, else increment it by 1
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
    
    if (currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
      // BUGFIX by epic commenter Carlos Santiago
      // checks if we are going back to the previous month and if the current year matches the year we are going to
      if (currMonth === -1 && currYear -1 === new Date().getFullYear()) {
        date = new Date();
      } else {
        // create a new date of current year & month and pass it as date value
        date = new Date(currYear, currMonth);
      }
      date = new Date(currYear, currMonth);
      currYear = date.getFullYear(); // updating current year with new date year
      currMonth = date.getMonth(); // updating current month with new date month
    } else {
      date = new Date(); // pass the current date as date value
    }
    renderCalendar();
  });
});