import { DrawingPage } from "@src/pages/DrawingPage/DrawingPage";

const onInit = () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const drawingPage = DrawingPage();
  app.appendChild(drawingPage);
};

document.addEventListener("DOMContentLoaded", onInit);
