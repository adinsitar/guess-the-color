const currentColor = document.querySelector(".current-color");
const squares = document.querySelectorAll(".color");
const numOfColors = squares.length;
const letters = document.querySelectorAll(".letter");
const next = document.querySelector(".next-btn");
const start = document.querySelector(".start-btn");
const score = document.querySelector(".score");
const modal = document.querySelector(".modal");
const modalWrong = document.querySelector(".modal-wrong");
const startAgain = document.querySelector(".try_again-btn");
let points = 0;

const randomNumber = (max) => {
  return Math.floor(Math.random() * max);
};

const randomColor = () => {
  const r = randomNumber(256);
  const g = randomNumber(256);
  const b = randomNumber(256);

  return `rgb(${r}, ${g}, ${b})`;
};

const storeColors = (pickedColors) => {
  let storedColors = [];
  for (let i = 0; i < pickedColors; i++) {
    storedColors.push(randomColor());
  }
  return storedColors;
};

let colors = storeColors(numOfColors);

function getOneRandomColor() {
  let random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

let pickedColor = getOneRandomColor();

const hideShow = (selector) => {
  const item = document.querySelectorAll(selector);
  item.forEach((element) => {
    if (element.classList.contains("hidden")) {
      element.classList.remove("hidden");
    } else if (!element.classList.contains("hidden")) {
      element.classList.add("hidden");
    }
  });
};

start.addEventListener("click", function () {
  for (let i = 0; i < squares.length; i++) {
    currentColor.innerHTML = pickedColor;
    squares[i].style.backgroundColor = colors[i];
    squares[i].addEventListener("click", function () {
      let clickedColor = this.style.backgroundColor;
      if (clickedColor === pickedColor) {
        hideShow(".modal");
        score.innerHTML = `Score: ${(points += 1)}`;
      } else if (clickedColor !== pickedColor) {
        hideShow(".modal-wrong");
      }
    });
  }
  hideShow(".start-btn");
});

next.addEventListener("click", function () {
  colors = storeColors(numOfColors);
  pickedColor = getOneRandomColor();
  currentColor.innerHTML = pickedColor;

  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
  }
  hideShow(".modal");
});

startAgain.addEventListener("click", function () {
  colors = storeColors(numOfColors);
  pickedColor = getOneRandomColor();
  currentColor.innerHTML = pickedColor;

  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
  }
  score.innerHTML = `Score: ${(points = 0)}`;
  hideShow(".modal-wrong");
});
