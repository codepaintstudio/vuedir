// 导出进度类型，可以是圆形、条形或滚动条
export type ProgressType = 'circle' | 'bar' | 'scroll'

// 导出进度选项接口
export interface ProgressOptions {
  percent?: number // 百分比
  radius?: number // 半径
  strokeWidth?: number // 线宽
  color?: string // 颜色
  showText?: boolean // 是否显示文本
  transition?: string // 过渡效果
  height?: number // 高度
  autoIncrement?: {
    interval?: number // 更新间隔时间（毫秒）
    step?: number // 每次增加的百分比
    loop?: boolean // 是否循环播放
  } // 自动增加
  onReach?: {
    percent: number // 达到百分比
    callback: () => void // 回调函数
    once?: boolean // 是否只触发一次
  }[] // 达到百分比时触发
}

// 导出进度数据接口
export interface ProgressData {
  type: ProgressType // 进度类型
  svg?: SVGElement // SVG元素
  foreground?: SVGElement | HTMLElement // 前景元素
  text?: SVGElement | HTMLElement // 文本元素
  container?: HTMLElement // 容器元素
  options?: ProgressOptions // 进度选项
  onScroll?: () => void // 滚动事件
  lastPercent?: number // 最后百分比
  triggered?: Set<number> // 触发集合
}

// 声明全局变量
declare global {
  interface HTMLElement {
    _progress?: {
      type: ProgressType // 进度类型
      svg?: SVGElement // SVG元素
      foreground?: SVGElement | HTMLElement // 前景元素
      text?: SVGElement | HTMLElement // 文本元素
      container?: HTMLElement // 容器元素
      options?: ProgressOptions // 进度选项
      onScroll?: () => void // 滚动事件
      lastPercent?: number // 最后百分比
      triggered?: Set<number> // 触发集合
    }
    _progressTimer?: any // 进度定时器
    _progressTriggered?: any // 进度触发
  }
}
