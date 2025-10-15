import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { Toolbox } from "@src/components/Toolbox/Toolbox";

import { drawingStore } from "@src/stores/drawingStore";

type RenderComponent = {
  container: HTMLDivElement;
};

const renderComponent = (): RenderComponent => {
  const container = Toolbox();
  document.body.appendChild(container);
  return { container: container };
};

jest.mock("@src/stores/drawingStore", () => ({
  drawingStore: {
    getState: jest.fn().mockReturnValue({
      size: 10,
      color: "#ff0000",
      canvasCtx: { clearRect: jest.fn() },
    }),
    increaseSize: jest.fn(),
    decreaseSize: jest.fn(),
    setColor: jest.fn(),
    subscribe: jest.fn(),
  },
}));

describe("Toolbox.ts", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("General Tests.", () => {
    test("It should render toolbox container with default structure", () => {
      const { container } = renderComponent();

      expect(container).toBeInstanceOf(HTMLDivElement);
      expect(container.className).toBe("toolbox");

      expect(
        screen.getByRole("button", { name: /increase size/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /decrease size/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /clear size/i })
      ).toBeInTheDocument();

      const colorInput = container.querySelector(
        "input[type='color']"
      ) as HTMLInputElement;
      expect(colorInput).toBeInTheDocument();
      expect(colorInput?.value).toBe("#ff0000");

      const sizeLabel = container.querySelector(".toolbox__size");
      expect(sizeLabel?.textContent).toBe("10");
    });

    test("It should call drawingStore.subscribe for 'size'", () => {
      renderComponent();
      expect(drawingStore.subscribe).toHaveBeenCalledWith(
        "size",
        expect.any(Function)
      );
    });
  });

  describe("Button interactions.", () => {
    test("It should call increaseSize when '+' button is clicked", async () => {
      renderComponent();

      const increaseButton = screen.getByRole("button", {
        name: /increase size/i,
      });
      await user.click(increaseButton);

      expect(drawingStore.increaseSize).toHaveBeenCalledTimes(1);
    });

    test("It should call decreaseSize when '-' button is clicked", async () => {
      renderComponent();

      const decreaseButton = screen.getByRole("button", {
        name: /decrease size/i,
      });
      await user.click(decreaseButton);

      expect(drawingStore.decreaseSize).toHaveBeenCalledTimes(1);
    });

    test("It should clear the canvas when 'Clear' button is clicked", async () => {
      const mockClearRect = jest.fn();
      (drawingStore.getState as jest.Mock).mockReturnValue({
        size: 10,
        color: "#ff0000",
        canvasCtx: { clearRect: mockClearRect },
      });

      const canvas = document.createElement("canvas");
      canvas.className = "canvas";
      canvas.width = 100;
      canvas.height = 100;
      document.body.appendChild(canvas);

      renderComponent();

      const clearButton = screen.getByRole("button", { name: /clear size/i });
      await user.click(clearButton);

      expect(mockClearRect).toHaveBeenCalledWith(0, 0, 100, 100);
    });
  });

  describe("Color input Tests.", () => {
    test("It should call setColor with new value when color input changes", async () => {
      const { container } = renderComponent();

      const colorInput = container.querySelector(
        "input[type='color']"
      ) as HTMLInputElement;
      expect(colorInput.value).toBe("#ff0000");

      colorInput.value = "#00ff00";
      colorInput.dispatchEvent(new Event("change"));

      expect(drawingStore.setColor).toHaveBeenCalledWith("#00ff00");
    });
  });

  describe("Reactive rendering.", () => {
    test("It should update size label when store triggers renderSize", () => {
      let renderCallback: Function | undefined;

      (drawingStore.subscribe as jest.Mock).mockImplementation((_key, cb) => {
        renderCallback = cb;
      });

      const { container } = renderComponent();

      (drawingStore.getState as jest.Mock).mockReturnValue({
        size: 20,
        color: "#ff0000",
        canvasCtx: { clearRect: jest.fn() },
      });

      renderCallback?.();

      const sizeLabel = container.querySelector(".toolbox__size");
      expect(sizeLabel?.textContent).toBe("20");
    });
  });
});
