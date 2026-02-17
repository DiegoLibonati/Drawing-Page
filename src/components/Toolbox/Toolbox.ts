import type { ToolboxComponent } from "@/types/components";

import { Button } from "@/components/Button/Button";

import { drawingStore } from "@/stores/drawingStore";

import "@/components/Toolbox/Toolbox.css";

const handleIncreaseSize = (): void => {
  drawingStore.increaseSize();
};

const handleDecreaseSize = (): void => {
  drawingStore.decreaseSize();
};

const handleSetColor = (e: Event): void => {
  const value = (e.target as HTMLInputElement).value;
  drawingStore.setColor(value);
};

const handleClearCanvas = (): void => {
  const { canvasCtx } = drawingStore.getState();

  const canvas = document.querySelector<HTMLCanvasElement>(".canvas");

  if (canvasCtx && canvas) {
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  }
};

export const Toolbox = (): ToolboxComponent => {
  const { size, color } = drawingStore.getState();

  const divRoot = document.createElement("div") as ToolboxComponent;
  divRoot.className = "toolbox";

  divRoot.innerHTML = `
    <span id="size" class="toolbox__size">${size}</span>

    <input type="color" id="color" class="toolbox__input-color" value="${color}" />
  `;

  const toolboxSize = divRoot.querySelector<HTMLSpanElement>(".toolbox__size");
  const toolboxInputColor = divRoot.querySelector<HTMLInputElement>(
    ".toolbox__input-color"
  );

  const buttonIncrease = Button({
    id: "increase",
    ariaLabel: "increase size",
    className: "toolbox__btn-increase",
    children: "+",
  });

  const buttonDecrease = Button({
    id: "decrease",
    ariaLabel: "decrease size",
    className: "toolbox__btn-decrease",
    children: "-",
  });

  const buttonClear = Button({
    id: "clear",
    ariaLabel: "clear size",
    className: "toolbox__btn-clear",
    children: "Clear",
  });

  divRoot.insertBefore(buttonIncrease, toolboxSize);
  divRoot.insertBefore(buttonDecrease, toolboxInputColor);
  divRoot.append(buttonClear);

  const handleColorChange = (e: Event): void => {
    handleSetColor(e);
  };

  buttonIncrease.addEventListener("click", handleIncreaseSize);
  buttonDecrease.addEventListener("click", handleDecreaseSize);
  buttonClear.addEventListener("click", handleClearCanvas);
  toolboxInputColor?.addEventListener("change", handleColorChange);

  const renderSize = (): void => {
    const { size } = drawingStore.getState();

    const toolboxSize =
      divRoot.querySelector<HTMLSpanElement>(".toolbox__size");

    if (String(size) === toolboxSize?.textContent) return;

    if (toolboxSize) {
      toolboxSize.textContent = String(size);
    }
  };

  const unsubscribe = drawingStore.subscribe("size", renderSize);

  divRoot.cleanup = (): void => {
    unsubscribe();

    buttonIncrease.removeEventListener("click", handleIncreaseSize);
    buttonDecrease.removeEventListener("click", handleDecreaseSize);
    buttonClear.removeEventListener("click", handleClearCanvas);
    toolboxInputColor?.removeEventListener("change", handleColorChange);

    buttonIncrease.cleanup?.();
    buttonDecrease.cleanup?.();
    buttonClear.cleanup?.();
  };

  return divRoot;
};
