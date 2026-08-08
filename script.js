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
}
