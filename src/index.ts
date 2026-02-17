import "@/index.css";
import { DrawingPage } from "@/pages/DrawingPage/DrawingPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const drawingPage = DrawingPage();
  app.appendChild(drawingPage);
};

document.addEventListener("DOMContentLoaded", onInit);
