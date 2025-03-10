export interface DraggableOptions {
  //  导出可拖拽选项接口
  items: any[] //  可拖拽的元素数组
  onUpdate: (newItems: any[]) => void //  更新元素数组的方法
  storageKey?: string //  存储键
}

export interface DraggableHTMLElement extends HTMLElement {
  //  导出可拖拽元素接口
  // 可拖拽监听器
  _draggableListeners?: {
    // 鼠标按下事件
    mousedown: (event: MouseEvent) => void
    // 触摸开始事件
    touchstart: (event: TouchEvent) => void
  }
  // 可拖拽状态
  _draggableState?: DragState
  _dataItem: any //  元素绑定的数据
}

export interface DragState {
  //  导出拖拽状态接口
  el: HTMLElement //  当前拖拽的元素
  options: DraggableOptions //  可拖拽选项
  clone: HTMLElement | null //  克隆的元素
  // placeholder: HTMLElement | null //  占位符元素
  startY: number //  起始Y坐标
  startIndex: number //  起始索引
  originalElement: HTMLElement | null //  原始元素
}
