export interface DragEventParams {
  event: MouseEvent;
  left: number;
  top: number;
}

export type DragCallback = (params: DragEventParams) => void;

export interface OnDragOptions {
  event: DragCallback;
  throttle?: number;
}

export type OnDragType = DragCallback | OnDragOptions;

export interface DragOptions {
  range?: HTMLElement | null;
  startDrag?: DragCallback;
  onDrag?: OnDragType;
  endDrag?: DragCallback;
}
