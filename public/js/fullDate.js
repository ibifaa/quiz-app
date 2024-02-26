const myDate = document.querySelector(".fulldate");

const dateObject = new Date();
let currentDate = dateObject.toDateString();

myDate.textContent= currentDate;
