const today = new Date();

const year = today.getFullYear();

const month = today.getMonth() + 1;

const day = today.getDate();

const formattedDate = `${year}/${month}/${day}`;

//HTML要素を取得
const catMessage = document.getElementById("catMessage");
const catImage = document.getElementById("catImage");
const changeButton = document.getElementById("changeButton");
const lastDate = document.getElementById("lastDate");
const daysPassed = document.getElementById("daysPassed");
const remainingDays = document.getElementById("remainingDays");

lastDate.textContent = formattedDate;

const sevenDaysButton = document.getElementById("sevenDaysButton");
const fourteenDaysButton = document.getElementById("fourteenDaysButton");

const savedCycle = localStorage.getItem("cycle");
let cycle = savedCycle ? Number(savedCycle) : 7;
if (cycle === 7) {
  sevenDaysButton.classList.add("selected");
} else {
  fourteenDaysButton.classList.add("selected");
}

let days = 0;

//シーツを交換したときの処理
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

//7日ボタン
sevenDaysButton.addEventListener("click", function () {
  setCycle(7);
});

//14日ボタン
fourteenDaysButton.addEventListener("click", function () {
  setCycle(14);
});

// 画面表示を更新する関数
function updateCatWorld(days, cycle) {
  catWorld.classList.remove("clean", "warning", "danger");

  if (days >= cycle) {
    catWorld.classList.add("danger");
    catImage.src = "images/cat-danger.png";
    catMessage.textContent = "汚いにゃ...";
  } else if (days >= cycle / 2) {
    catWorld.classList.add("warning");
    catImage.src = "images/cat-warning.png";
    catMessage.textContent = "そろそろ交換してほしいにゃ…";
  } else {
    catWorld.classList.add("clean");
    catImage.src = "images/cat-clean.png";
    catMessage.textContent = "快適だにゃ";
  }
}

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

function setCycle(newCycle) {
  cycle = newCycle;
  localStorage.setItem("cycle", newCycle);
  updateCatWorld(days, newCycle);
  updateRemainingDays(days, newCycle);
  if (newCycle === 7) {
    sevenDaysButton.classList.add("selected");
    fourteenDaysButton.classList.remove("selected");
  } else {
    fourteenDaysButton.classList.add("selected");
    sevenDaysButton.classList.remove("selected");
  }
}
