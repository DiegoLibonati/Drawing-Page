export const getElements = () => ({
  canvas: document.getElementById("canvas") as HTMLCanvasElement,
  increaseBtn: document.getElementById("increase") as HTMLButtonElement,
  decreaseBtn: document.getElementById("decrease") as HTMLButtonElement,
  sizeElement: document.getElementById("size") as HTMLSpanElement,
  color: document.getElementById("color") as HTMLInputElement,
  clearElement: document.getElementById("clear") as HTMLButtonElement,
});
