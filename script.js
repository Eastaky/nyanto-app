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
const remainingDays = document.getElementById("remainingDays");

const savedCycle = localStorage.getItem("cycle");
if (savedCycle === "7") {
  sevenDaysButton.classList.add("selected");
} else if (savedCycle === "14") {
  fourteenDaysButton.classList.add("selected");
} else {
  sevenDaysButton.classList.add("selected");
}

let cycle = savedCycle ? Number(savedCycle) : 7;
let days = 0;

changeButton.addEventListener("click", function () {
  lastDate.textContent = formattedDate;
  localStorage.setItem("lastChangeDate", formattedDate);
  lastDate.textContent = formattedDate;
  daysPassed.textContent = "0日経過";
  updateRemainingDays(0, cycle);
  updateCatWorld(0, cycle);
});

const savedDate = localStorage.getItem("lastChangeDate");
const catWorld = document.getElementById("catWorld");
if (savedDate) {
  lastDate.textContent = savedDate;
  const lastChange = new Date(savedDate);
  const difference = today - lastChange;
  days = Math.floor(difference / (1000 * 60 * 60 * 24));
  updateRemainingDays(days, cycle);
  const testDays = 4;
  updateCatWorld(days, cycle);
  daysPassed.textContent = `${days}日経過`;
} else {
  lastDate.textContent = "まだ登録されていません";
  daysPassed.textContent = "--日経過";
  remainingDays.textContent = "交換日を登録してください";
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

//7日ボタン
sevenDaysButton.addEventListener("click", function () {
  cycle = 7;
  localStorage.setItem("cycle", 7);
  updateCatWorld(days, 7);
  sevenDaysButton.classList.add("selected");
  fourteenDaysButton.classList.remove("selected");
  updateRemainingDays(days, 7);
});

//14日ボタン
fourteenDaysButton.addEventListener("click", function () {
  cycle = 14;
  localStorage.setItem("cycle", 14);
  updateCatWorld(days, 14);
  fourteenDaysButton.classList.add("selected");
  sevenDaysButton.classList.remove("selected");
  updateRemainingDays(days, 14);
});

console.log(cycle);

console.log(savedCycle);

function updateRemainingDays(days, cycle) {
  const remaining = cycle - days;
  if (remaining === 0) {
    remainingDays.textContent = "今日が交換日です！";
  } else if (remaining < 0) {
    const overdueDays = Math.abs(remaining);
    remainingDays.textContent = `交換時期を${overdueDays}日過ぎています！`;
  } else {
    remainingDays.textContent = `次の交換まであと${remaining}日`;
  }
}
