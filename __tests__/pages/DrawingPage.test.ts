import type { Page } from "@/types/pages";

import { DrawingPage } from "@/pages/DrawingPage/DrawingPage";

import { drawingStore } from "@/stores/drawingStore";

const renderPage = (): Page => {
  const container = DrawingPage();
  document.body.appendChild(container);
  return container;
};

describe("DrawingPage", () => {
  beforeEach(() => {
    drawingStore.setState({ size: 30, color: "#000000", canvasCtx: null });
  });

  afterEach(() => {
    document.body.innerHTML = "";
    drawingStore.setState({ size: 30, color: "#000000", canvasCtx: null });
  });

  it("should render canvas element", () => {
    renderPage();

    const canvas = document.querySelector<HTMLCanvasElement>(".canvas");
    expect(canvas).toBeInTheDocument();
    expect(canvas?.tagName).toBe("CANVAS");
    expect(canvas).toHaveAttribute("width", "800px");
    expect(canvas).toHaveAttribute("height", "600px");
  });

  it("should render toolbox component", () => {
    renderPage();

    const toolbox = document.querySelector<HTMLDivElement>(".toolbox");
    expect(toolbox).toBeInTheDocument();
  });

  it("should set canvas context in store", () => {
    renderPage();

    const canvasCtx = drawingStore.get("canvasCtx");
    expect(canvasCtx).not.toBeNull();
  });

  it("should handle mousedown event", () => {
    renderPage();

    const canvas = document.querySelector<HTMLCanvasElement>(".canvas");
    const mouseEvent = new MouseEvent("mousedown", {
      clientX: 100,
      clientY: 100,
    });

    Object.defineProperty(mouseEvent, "offsetX", { value: 100 });
    Object.defineProperty(mouseEvent, "offsetY", { value: 100 });

    canvas?.dispatchEvent(mouseEvent);

    expect(canvas).toBeInTheDocument();
  });

  it("should handle mouseup event", () => {
    renderPage();

    const canvas = document.querySelector<HTMLCanvasElement>(".canvas");
    const mouseEvent = new MouseEvent("mouseup");

    canvas?.dispatchEvent(mouseEvent);

    expect(canvas).toBeInTheDocument();
  });

  it("should handle mousemove event", () => {
    renderPage();

    const canvas = document.querySelector<HTMLCanvasElement>(".canvas");
    const mouseMoveEvent = new MouseEvent("mousemove", {
      clientX: 150,
      clientY: 150,
    });

    Object.defineProperty(mouseMoveEvent, "offsetX", { value: 150 });
    Object.defineProperty(mouseMoveEvent, "offsetY", { value: 150 });

    canvas?.dispatchEvent(mouseMoveEvent);

    expect(canvas).toBeInTheDocument();
  });

  it("should cleanup event listeners and reset canvas context", () => {
    const page = renderPage();

    expect(drawingStore.get("canvasCtx")).not.toBeNull();

    page.cleanup?.();

    expect(drawingStore.get("canvasCtx")).toBeNull();
  });
});
