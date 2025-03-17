export type AudioPectrumMode = 'bars' | 'waveform' | 'circular' | 'custom'
export interface VAutoboxHTMLElement extends HTMLElement {
  _audioPectrumCleanup?: () => void
}
export type DrawFunction = (params: {
  ctx: CanvasRenderingContext2D
  dataArray: Uint8Array
  canvas: HTMLCanvasElement
  analyzer: AnalyserNode
  colors?: ColorSettings
}) => void

interface ColorSettings {
  start: string
  end: string
}

export interface AudioPectrumOptions {
  mode?: AudioPectrumMode // 显示模式
  fftSize?: number // FFT分析尺寸
  colors?: ColorSettings // 颜色配置
  customDraw?: DrawFunction // 自定义绘制函数
}
