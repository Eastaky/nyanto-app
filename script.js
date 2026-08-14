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

const sevenDaysButton = document.getElementById("sevenDaysButton");
const fourteenDaysButton = document.getElementById("fourteenDaysButton");

const changeButton = document.getElementById("changeButton");
const daysPassed = document.getElementById("daysPassed");
const savedCycle = localStorage.getItem("cycle");
const cycle = Number(savedCycle);

changeButton.addEventListener("click", function () {
  lastDate.textContent = formattedDate;
  localStorage.setItem("lastChangeDate", formattedDate);
  lastDate.textContent = formattedDate;
  daysPassed.textContent = "0日経過";
  updateCatWorld(0, cycle);
});

const savedDate = localStorage.getItem("lastChangeDate");
const catWorld = document.getElementById("catWorld");
if (savedDate) {
  lastDate.textContent = savedDate;
  const lastChange = new Date(savedDate);
  const difference = today - lastChange;
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const testDays = 4;
  updateCatWorld(days, cycle);
  daysPassed.textContent = `${days}日経過`;
}

function updateCatWorld(days, cycle) {
  catWorld.classList.remove("clean", "warning", "danger");

  if (days >= cycle) {
    console.log("交換時期！");
    catWorld.classList.add("danger");
  } else if (days >= cycle / 2) {
    console.log("少しよどんでいる");

    catWorld.classList.add("warning");
  } else {
    console.log("きれい");
    catWorld.classList.add("clean");
  }
}

sevenDaysButton.addEventListener("click", function () {
  localStorage.setItem("cycle", 7);
  updateCatWorld(days, 7);
});

fourteenDaysButton.addEventListener("click", function () {
  localStorage.setItem("cycle", 14);
  updateCatWorld(days, 14);
});

console.log(cycle);

console.log(savedCycle);
