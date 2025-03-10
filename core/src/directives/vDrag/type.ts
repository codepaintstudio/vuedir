export interface DragEventParams {
  event: MouseEvent
  left: number
  top: number
}

export type DragCallback = (params: DragEventParams) => void

export interface OnDragOptions {
  event: DragCallback
  throttle?: number
}

export type OnDragType = DragCallback | OnDragOptions

export interface SortEventParams {
  oldIndex: number
  newIndex: number
  items: any[]
}

export type SortCallback = (params: SortEventParams) => void

export interface DragOptions {
  startDrag?: DragCallback
  onDrag?: OnDragType
  endDrag?: DragCallback

  isList?: boolean
  onSort?: SortCallback

  handle?: string

  axis?: 'x' | 'y' | 'both'
  bounds?: HTMLElement | 'parent' | null
  disabled?: boolean
}
