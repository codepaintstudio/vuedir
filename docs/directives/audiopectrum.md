# v-audiopectrum 指令

## 介绍

`v-audiopectrum` 是一个音频频谱可视化指令，能够将音频元素的波形和频率数据实时渲染为动态图形。支持 ​**三种内置可视化模式** 和 ​**完全自定义渲染**，适用于音乐播放器、语音分析、音效可视化等场景。

## 核心特性

- 实时音频数据分析（时域/频域）
- 三种预制可视化模式：柱状图/波形图/圆形谱
- 响应式布局自动适配容器尺寸
- 自定义颜色方案和渲染逻辑
- 完善的资源清理机制

## 基础用法
# 请记得打开声音，没有声音是不会显示的哦！
音频统一为 《trun the lights back on》

<audioPectrumDefaultDemo />
::: details 查看代码
<<< @/.vitepress/components/vAudioPectrum/audioPectrumDefaultDemo.vue
:::

## 进阶用法

<audioPectrumAdvancedDemo/>
::: details 查看代码 
<<< @/.vitepress/components/vAudioPectrum/audioPectrumAdvancedDemo.vue 
:::

## 自定义渲染指南

<audioPectrumCustomDemo/>
::: details 查看代码
<<< @/.vitepress/components/vAudioPectrum/audioPectrumCustomDemo.vue
:::

### 接口说明

通过 `customDraw` 参数传入自定义渲染函数，接收以下参数对象：

```typescript
interface DrawContext {
  ctx: CanvasRenderingContext2D // 画布绘制上下文
  dataArray: Uint8Array // 当前帧音频数据（根据模式不同含义不同）
  canvas: HTMLCanvasElement // 画布DOM元素
  analyzer: AnalyserNode // Web Audio分析器实例
  colors: {
    // 颜色配置
    start: string
    end: string
  }
}
```

## API

<ApiTable :data="props" />

## 注意事项

::: warning

- ​音频上下文限制

需要用户交互后初始化（点击事件后生效）
单页面最多同时存在 ​4个 实例

- ​性能优化

移动端建议设置 fftSize: 128
复杂场景使用 requestIdleCallback 优化

- ​内存管理

```vue
<audio v-if="shouldShow" v-audiopectrum />
<!-- 正确 -->
<audio v-show="shouldShow" v-audiopectrum />
<!-- 错误 -->
```

<script setup>
    import audioPectrumDefaultDemo from '../.vitepress/components/vAudioPectrum/audioPectrumDefaultDemo.vue'
    import audioPectrumAdvancedDemo from '../.vitepress/components/vAudioPectrum/audioPectrumAdvancedDemo.vue'
    import audioPectrumCustomDemo from '../.vitepress/components/vAudioPectrum/audioPectrumCustomDemo.vue'
    import ApiTable from '../.vitepress/components/ApiTable.vue';
    const props = [
  {
    name: 'mode',
    type: 'bars | waveform | circular | custom（自定义）',
    required: false,
    description: '可视化模式选择',
    default: 'bars'
  },
  {
    name: 'fftSize',
    type: 'number',
    required: false,
    description: 'FFT转换窗口大小（需为2的幂次方）',
    default: '256'
  },
  {
    name: 'colors',
    type: '{ start: string, end: string }',
    required: false,
    description: '渐变颜色配置（起始色/结束色）',
    default: '{ start: "#00ff00", end: "#ff0000" }'
  },
  {
    name: 'customDraw',
    type: 'function',
    required: false,
    description: '自定义渲染函数（需配合 mode: "custom" 使用）',
    default: 'null'
  }
];
</script>
