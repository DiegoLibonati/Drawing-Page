import type { DrawingState } from "@/types/states";

import { Store } from "@/core/store";

export class DrawingStore extends Store<DrawingState> {
  // constructor(initialState: DrawingState) {
  //   super(initialState);
  // }

  public increaseSize(): void {
    const { size } = this.getState();

    const max = 30;
    const newSize = size + 1;

    this.setState({ size: newSize >= max ? max : newSize });
  }

  public decreaseSize(): void {
    const { size } = this.getState();

    const min = 1;
    const newSize = size - 1;

    this.setState({ size: newSize <= min ? min : newSize });
  }

  public setColor(color: string): void {
    this.setState({ color: color });
  }

  public setCanvasContext(ctx: CanvasRenderingContext2D | null): void {
    this.setState({ canvasCtx: ctx });
  }
}

export const drawingStore = new DrawingStore({
  size: 30,
  color: "#000000",
  canvasCtx: null,
});
