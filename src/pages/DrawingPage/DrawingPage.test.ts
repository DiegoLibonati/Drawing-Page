import { DrawingPage } from "@src/pages/DrawingPage/DrawingPage";

type RenderComponent = {
  container: HTMLDivElement;
};

const renderComponent = (): RenderComponent => {
  const container = DrawingPage();
  document.body.appendChild(container);
  return { container: container };
};

describe("DrawingPage.ts", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests.", () => {
    test("It should render the canvas and toolbox", () => {
      const { container } = renderComponent();

      const canvas = container.querySelector<HTMLCanvasElement>("canvas");
      expect(canvas).toBeInTheDocument();
      expect(canvas?.className).toBe("canvas");

      const toolbox = container.querySelector<HTMLDivElement>(".toolbox");
      expect(toolbox).toBeInTheDocument();
    });
  });
});
