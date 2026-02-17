export interface DrawingState extends Record<string, unknown> {
  color: string;
  size: number;
  canvasCtx: CanvasRenderingContext2D | null;
}
