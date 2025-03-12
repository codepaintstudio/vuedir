// 定义磁铁属性接口
export interface MagnetOptions {
  // 磁力，数值越大吸引或排斥的效果越明显
  force: number
  // 磁极：'positive' | 'negative' 表示同极排斥、异极吸引；'iron' 可作为中性或特殊处理
  pole: 'positive' | 'negative' | 'iron'
}

// 扩展 HTMLElement，添加自定义属性
export interface MagnetElement extends HTMLElement {
  __magnetOptions?: MagnetOptions
}
