import { Toolbox } from "@src/components/Toolbox/Toolbox";

import { drawingStore } from "@src/stores/drawingStore";

import "@src/pages/DrawingPage/DrawingPage.css";

let isPressed: boolean = false;
let x: number | null = null;
let y: number | null = null;

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
  const { canvasCtx, size, color } = drawingStore.getState();

  if (!isPressed) return;

  const x2 = e.offsetX;
  const y2 = e.offsetY;

  canvasCtx!.beginPath();
  canvasCtx!.arc(x!, y!, size, 0, Math.PI * 2);
  canvasCtx!.fillStyle = color;
  canvasCtx!.fill();

  canvasCtx!.beginPath();
  canvasCtx!.moveTo(x!, y!);
  canvasCtx!.lineTo(x2, y2);
  canvasCtx!.strokeStyle = color;
  canvasCtx!.lineWidth = size * 2;
  canvasCtx!.stroke();

  x = x2;
  y = y2;
};

export const DrawingPage = (): HTMLDivElement => {
  const divRoot = document.createElement("div");
  divRoot.className = "";

  divRoot.innerHTML = `
    <canvas class="canvas" id="canvas" width="800px" height="600px"></canvas>
  `;

  const canvas = divRoot.querySelector<HTMLCanvasElement>(".canvas");
  const ctx = canvas!.getContext("2d");
  drawingStore.setCanvasContext(ctx);

  const toolbox = Toolbox();

  divRoot.append(toolbox);

  canvas!.addEventListener("mousedown", (e) => handleMouseDown(e));
  canvas!.addEventListener("mouseup", handleMouseUp);
  canvas!.addEventListener("mousemove", (e) => handleMouseMove(e));

  return divRoot;
};
