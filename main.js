const container = document.querySelector(".container");
container.style.width = "50vw";
container.style.height = "70vh";
const width = container.style.width;
const height = container.style.height;

// Create a box element
const box = document.createElement("div");
box.classList.add("box");

// Add the box 16 times to the body
for (let i = 0; i < 16; i++) {
  container.appendChild(box.cloneNode(true));
}

// Styling the boxes
let boxs = Array.from(document.querySelectorAll(".box"));
boxs.forEach(function (item) {
  item.style.width = String(50 / gridNumber) + "vw";
  item.style.height = String(70 / gridNumber) + "vh";
  hover(item);
});

// Hover effect on boxes
function hover(item) {
  item.addEventListener("mouseenter", function () {
    item.classList.add("box-hover");
  });

  item.addEventListener("mouseleave", function () {
    item.classList.remove("box-hover");
  });
}
