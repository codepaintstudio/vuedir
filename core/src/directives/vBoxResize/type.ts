// export interface ResizeHTMLElement extends HTMLElement {
//     _resizeObserver?: ResizeObserver | null;
// }

// export interface ResizeOptions {
//     callback: ((rect: DOMRectReadOnly, box?: string) => void) | ((rect: DOMRectReadOnly, box?: string) => void)[]; // 回调函数
//     box?: 'border-box' | 'content-box' | 'device-pixel-content-box'; // 盒子模型
// }

export interface BoxResizeHTMLElement extends HTMLElement {
  _resizeObserver?: ResizeObserver | null
}

export interface BoxResizeOptions {
  callback: ((rect: DOMRectReadOnly, box?: string) => void) | ((rect: DOMRectReadOnly, box?: string) => void)[] // 回调函数
  box?: 'border-box' | 'content-box' | 'device-pixel-content-box' // 盒子模型
}
