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

changeButton.addEventListener("click", function () {
  lastDate.textContent = formattedDate;
  localStorage.setItem("lastChangeDate", formattedDate);
  lastDate.textContent = formattedDate;
  daysPassed.textContent = "0日経過";
  updateCatWorld(0);
});

const savedDate = localStorage.getItem("lastChangeDate");
const catWorld = document.getElementById("catWorld");
if (savedDate) {
  lastDate.textContent = savedDate;
  const lastChange = new Date(savedDate);
  const difference = today - lastChange;
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  updateCatWorld(days);
}
daysPassed.textContent = `${days}日経過`;

function updateCatWorld(days) {
  catWorld.classList.remove("clean", "warning", "danger");
  if (days <= 2) {
    console.log("きれい");
    catWorld.classList.add("clean");
  } else if (days <= 6) {
    console.log("少しよどんでいる");
    catWorld.classList.add("warning");
  } else {
    console.log("交換時期！");
    catWorld.classList.add("danger");
  }
}

sevenDaysButton.addEventListener("click", function () {
  localStorage.setItem("cycle", 7);
});
