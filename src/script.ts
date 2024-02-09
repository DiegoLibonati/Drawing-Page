import {
  canvas,
  clearElement,
  colorElement,
  decreaseBtn,
  increaseBtn,
  sizeElement,
} from "./constants/elements";

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

let size: number = 30;
let x: number | null;
let y: number | null;
let isPressed: boolean = false;
let color: string = "black";

canvas.addEventListener("mousedown", (e) => {
  isPressed = true;

  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener("mouseup", () => {
  isPressed = false;

  x = null;
  y = null;
});

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    drawCircle(x!, y!);
    drawLine(x!, y!, x2, y2);
    x = x2;
    y = y2;
  }
});

const drawCircle = (x: number, y: number): void => {
  ctx?.beginPath();
  ctx?.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx?.fill();
};

const drawLine = (x1: number, y1: number, x2: number, y2: number): void => {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
};

increaseBtn.addEventListener("click", () => {
  size += 1;

  if (size > 50) {
    size = 50;
  }

  updateSizeOnScreen();
});

decreaseBtn.addEventListener("click", () => {
  size -= 1;

  if (size < 1) {
    size = 1;
  }

  updateSizeOnScreen();
});

const updateSizeOnScreen = () => {
  sizeElement.innerHTML = String(size);
};

colorElement.addEventListener("change", (e) => {
  const target = e.target as HTMLInputElement;

  color = target.value;
});

clearElement.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
