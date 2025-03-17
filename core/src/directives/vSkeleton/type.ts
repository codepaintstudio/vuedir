// 导出SkeletonOptions类型，用于配置Skeleton组件
export type SkeletonOptions = {
    isLoading: boolean; // 是否加载中
    blocks?: BlockConfig[]; // 块配置
    animation?: 'wave' | 'pulse' | 'none'; // 动画类型
    bgColor?: string; // 背景颜色
    highlightColor?: string; // 高亮颜色
}

// 导出BlockConfig类型，用于配置块
export type BlockConfig = {
    width?: number | string; // 宽度
    height?: number | string; // 高度
    top?: number | string; // 顶部距离
    left?: number | string; // 左侧距离
}

// 导出SkeletonElement接口，用于扩展HTMLElement，添加_skeleton属性
export interface SkeletonElement extends HTMLElement {
    _skeleton?: any; // _skeleton属性
}