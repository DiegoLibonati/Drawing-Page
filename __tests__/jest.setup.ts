import "@testing-library/jest-dom";

HTMLCanvasElement.prototype.getContext = jest.fn((contextType: string) => {
  if (contextType === "2d") {
    return {
      fillStyle: "",
      strokeStyle: "",
      lineWidth: 1,
      clearRect: jest.fn(),
      beginPath: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
    } as unknown as CanvasRenderingContext2D;
  }
  return null;
}) as typeof HTMLCanvasElement.prototype.getContext;
