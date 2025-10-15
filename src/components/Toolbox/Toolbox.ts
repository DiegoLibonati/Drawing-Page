import { Button } from "@src/components/Button/Button";

import { drawingStore } from "@src/stores/drawingStore";

import "@src/components/Toolbox/Toolbox.css";

const handleIncreaseSize = () => {
  drawingStore.increaseSize();
};

const handleDecreaseSize = () => {
  drawingStore.decreaseSize();
};

const handleSetColor = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;

  drawingStore.setColor(value);
};

const handleClearCanvas = () => {
  const { canvasCtx } = drawingStore.getState();

  const canvas = document.querySelector<HTMLCanvasElement>(".canvas");

  canvasCtx!.clearRect(0, 0, canvas!.width, canvas!.height);
};

export const Toolbox = (): HTMLDivElement => {
  const { size, color } = drawingStore.getState();

  const divRoot = document.createElement("div");
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

  buttonIncrease.addEventListener("click", handleIncreaseSize);
  buttonDecrease.addEventListener("click", handleDecreaseSize);
  buttonClear.addEventListener("click", handleClearCanvas);
  toolboxInputColor?.addEventListener("change", (e) => handleSetColor(e));

  const renderSize = () => {
    const { size } = drawingStore.getState();

    const toolboxSize =
      divRoot.querySelector<HTMLSpanElement>(".toolbox__size");

    if (String(size) === toolboxSize?.textContent) return;

    toolboxSize!.textContent = String(size);
  };

  drawingStore.subscribe("size", renderSize);

  return divRoot;
};
