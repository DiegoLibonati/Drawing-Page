import { getElements } from "@src/helpers/getElements";

let ctx: CanvasRenderingContext2D;

let size: number;
let x: number | null;
let y: number | null;
let color: string;

let isPressed: boolean;

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

const updateSizeOnScreen = () => {
  const { sizeElement } = getElements();

  sizeElement.innerHTML = String(size);
};

const handleMouseDown = (e: MouseEvent) => {
  isPressed = true;

  x = e.offsetX;
  y = e.offsetY;
};

const handleMouseUp = () => {
  isPressed = false;

  x = null;
  y = null;
};

const handleMouseMove = (e: MouseEvent) => {
  if (!isPressed) return;

  const x2 = e.offsetX;
  const y2 = e.offsetY;

  drawCircle(x!, y!);
  drawLine(x!, y!, x2, y2);
  x = x2;
  y = y2;
};

const handleClickIncrease = () => {
  size += 1;

  if (size > 50) size = 50;

  updateSizeOnScreen();
};

const handleClickDecrease = () => {
  size -= 1;

  if (size < 1) size = 1;

  updateSizeOnScreen();
};

const handleClickColor = (e: Event) => {
  const target = e.target as HTMLInputElement;

  color = target.value;
};

const handleClickClear = () => {
  const { canvas } = getElements();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const setInitialValues = (): void => {
  const { canvas } = getElements();

  ctx = canvas.getContext("2d")!;

  size = 30;
  x = null;
  y = null;
  isPressed = false;
  color = "black";
};

const onInit = () => {
  const { canvas, increaseBtn, decreaseBtn, color, clearElement } =
    getElements();

  setInitialValues();

  canvas.addEventListener("mousedown", (e) => handleMouseDown(e));
  canvas.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mousemove", (e) => handleMouseMove(e));

  increaseBtn.addEventListener("click", handleClickIncrease);
  decreaseBtn.addEventListener("click", handleClickDecrease);
  color.addEventListener("change", (e) => handleClickColor(e));
  clearElement.addEventListener("click", handleClickClear);
};

document.addEventListener("DOMContentLoaded", onInit);
