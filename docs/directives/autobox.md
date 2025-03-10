# v-autobox 指令

::: warning

此指令开发并不完善，请谨慎使用。

:::

## 介绍

`v-autobox` 指令用于自动调整容器尺寸以完美适应子元素内容。它会动态计算子元素的 **最大宽度** 和 **总高度**，并自动考虑边距（margin）、边框（border）、填充（padding）等布局因素，适用于动态内容容器、自适应卡片等场景。

## 基础用法

<AutoboxDefaultDemo/>
::: details 查看代码

<<< @/.vitepress/components/vAutobox/AutoboxDefaultDemo.vue

:::

## 扩展用法

#### 因为选择 p 标签所以 img 溢出了

<AutoboxUltraDemo/>
可以设置多个参数，来达到自定义效果:

::: details 查看代码

<<< @/.vitepress/components/vAutobox/AutoboxUltraDemo.vue

:::

## API

<ApiTable :data="props" />

## 注意事项

::: warning

#### 此指令开发并不完善，请谨慎使用，若要使用请观看以下几点

1. **目标元素**

   - 必须为 **无子元素** 的叶子节点
   - 用于 vue 组件可能会有问题

2. **参数规范**

   - `selector` 避免通配符 `*`
   - `maxWidth` 默认 `100vw` 可能导致溢出

3. **样式覆盖**

   - 父元素会被强制设置 `box-sizing: border-box`
   - 若需 `white-space: nowrap` 需手动覆盖

4. **动态内容**

   - 异步加载后需用 `key` 强制刷新
   - 用 `v-if` 控制显隐，而非 `v-show`

5. **浏览器兼容**

   - 不支持 IE/旧浏览器（需 ResizeObserver polyfill）

6. **性能风险**

   - 子元素超过 50 个时谨慎使用

7. **边距陷阱**
   - 父元素有 padding/border 时计算可能异常
   - 相邻元素 margin 折叠需手动验证  
   :::
   <script setup>
   import AutoboxDefaultDemo from '../.vitepress/components/vAutobox/AutoboxDefaultDemo.vue'
   import AutoboxUltraDemo from '../.vitepress/components/vAutobox/AutoboxUltraDemo.vue'
   import ApiTable from '../.vitepress/components/ApiTable.vue';
   const props = [
     {
       name: 'selector',
       type: 'string',
       required: false,
       description: '选择器，用于指定需要自动调整尺寸的容器',
       default: '*(全部)',
     },{
       name: 'maxWidth',
       type: 'string',
       required: false,
       description: '容器的最大宽度，默认为 100vw',
       default: '100vw',
     }
   ];
   </script>
