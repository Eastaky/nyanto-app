const today = new Date();
console.log(today);

const year = today.getFullYear();
console.log(year);

const month = today.getMonth() + 1;
console.log(month);

const day = today.getDate();
console.log(day);

const formattedDate = `${year}/${month}/${day}`;
console.log(formattedDate);

const lastDate = document.getElementById("lastDate");

lastDate.textContent = formattedDate;

const changeButton = document.getElementById("changeButton");

changeButton.addEventListener("click", function () {
  lastDate.textContent = formattedDate;
  localStorage.setItem("lastChangeDate", formattedDate);
});

const savedDate = localStorage.getItem("lastChangeDate");
if (savedDate) {
  lastDate.textContent = savedDate;
  const daysPassed = document.getElementById("daysPassed");
  const lastChange = new Date(savedDate);
  const difference = today - lastChange;
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const testDays = 3;
  if (testDays <= 2) {
    console.log("きれい");
    catWorld.classList.add("clean");
  } else if (testDays <= 6) {
    console.log("少しよどんでいる");
    catWorld.classList.add("warning");
  } else {
    console.log("交換時期！");
    catWorld.classList.add("danger");
  }
}
daysPassed.textContent = `${days}日経過`;
const catWorld = document.getElementById("catWorld");
