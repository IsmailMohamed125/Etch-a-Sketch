const container = document.querySelector(".container");
container.style.width = "50vw";
container.style.height = "70vh";
const width = container.style.width;
const height = container.style.height;

let currentColor = "";

// Creating slider
const slider = document.querySelector(".slider");
const value = document.querySelector("#value");
value.textContent = `${slider.value} X ${slider.value}`;
slider.addEventListener("input", (event) => {
  let inputValue = event.target.value;
  value.textContent = `${inputValue} X ${inputValue}`;
});

let gridNumber = Number(slider.value);
let gridArea = Number(slider.value) * Number(slider.value);

// Create a box element
const box = document.createElement("div");
box.classList.add("box");

// Add the box 16 times to the body
for (let i = 0; i < gridArea; i++) {
  container.appendChild(box.cloneNode(true));
}

// Styling the boxes
let boxs = Array.from(document.querySelectorAll(".box"));
boxs.forEach(function (item) {
  item.style.width = String(50 / gridNumber) + "vw";
  item.style.height = String(70 / gridNumber) + "vh";
  hover(item);
});

// Creating a new grid
const newBtn = document.querySelector(".btn-grid");
newBtn.addEventListener("click", function () {
  boxs.forEach((item) => item.remove());
  gridNumber = Number(slider.value);
  gridArea = Number(slider.value) * Number(slider.value);
  for (let i = 0; i < gridArea; i++) {
    container.appendChild(box.cloneNode(true));
  }
  boxs = document.querySelectorAll(".box");
  boxs.forEach(function (item) {
    item.style.width = String(50 / gridNumber) + "vw";
    item.style.height = String(70 / gridNumber) + "vh";
    hover(item);
  });
});

// Adding rainbow colors
const rainbowBtn = document.querySelector(".btn-rainbow");
rainbowBtn.addEventListener("click", function () {
  currentColor = "rainbow";
  removeHover();
  colors();
});

// Darkening each color
const darkenBtn = document.querySelector(".btn-darken");
darkenBtn.addEventListener("click", function () {
  currentColor = "darken";
  removeHover();
  colors();
});

const standardBtn = document.querySelector(".btn-classic");
standardBtn.addEventListener("click", function () {
  currentColor = "black";
  removeHover();
  colors();
});

function colors() {
  boxs.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      if (currentColor === "black") {
        item.style.backgroundColor = "black";
      } else if (currentColor === "rainbow") {
        item.style.backgroundColor = `rgb(${randomInt(0, 255)},${randomInt(
          0,
          255
        )},${randomInt(0, 255)})`;
      } else if (currentColor === "darken") {
        if (item.style.backgroundColor !== "black") {
          const colorToDarken =
            item.style.backgroundColor || "rgb(255, 255, 255)";
          const darkerColor = makeColorDarker(colorToDarken);
          item.style.backgroundColor = darkerColor;
        }
      }
    });
  });
}

function hover(item) {
  item.addEventListener("mouseenter", function () {
    item.classList.add("box-hover");
  });

  item.addEventListener("mouseleave", function () {
    item.classList.remove("box-hover");
  });
}

function removeHover() {
  boxs.forEach((item) => item.classList.remove("box-hover"));
}

function randomInt(min, max) {
  return Math.trunc(Math.random() * (max - min + 1)) + min;
}

function makeColorDarker(color) {
  // Check if color is in RGB format
  const rgbMatch = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (rgbMatch) {
    let r = parseInt(rgbMatch[1]);
    let g = parseInt(rgbMatch[2]);
    let b = parseInt(rgbMatch[3]);

    const factor = 0.9;
    r = Math.floor(r * factor);
    g = Math.floor(g * factor);
    b = Math.floor(b * factor);

    return `rgb(${r}, ${g}, ${b})`;
  } else {
    // Default case: assume white
    return "rgb(255, 255, 255)";
  }
}
