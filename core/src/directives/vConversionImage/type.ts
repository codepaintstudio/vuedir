// 定义压缩类型
export type CompressionType = 'oto' | 'lts' | 'stl';

// 定义图像转换选项
export type ImageConversionOptions =
  // 转换为oto格式
  | {
    to: string;
    compression: 'oto';
  }
  // 转换为lts或stl格式，并指定压缩比
  | {
    to: string;
    compression: 'lts' | 'stl';
    ratio: number;
  };