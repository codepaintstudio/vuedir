# v-timetrack

## 简介

用于媒体元素(`video`,`audio`)的指令，当达到指定时间时触发回调函数，支持数组形式的多个时间点。比如常见的：

- 视频网站的广告弹窗
- 音乐网站的试听

## 用法

通过给元素或者组件添加`v-timetrack`的指令实现。在这个例子中，我们在视频播放到 5 秒 和 结束 时触发回调函数

<Basic />

::: details 查看代码

<<< @/.vitepress/components/vTimeTrack/Basic.vue

:::

## API

<ApiTable :data="data" />

## 注意事项

::: warning 注意

- `time`属性的单位为毫秒或者百分比。
- 回调函数的参数为当前时间点。

:::

<script setup>
import Basic from "../.vitepress/components/vTimeTrack/Basic.vue"
import ApiTable from "../.vitepress/components/ApiTable.vue";

const data = [
    {
      name: 'options',
      type: 'option[]',
      default: '[]',
      description: '配置对象数组',
      required: true,
    },
    {
        name: 'option',
        type: 'object',
        default: '{}',
        description: '配置对象',
        required: true,
    },
    {
        name: 'time',
        type: 'number ｜ string',
        default: '0',
        description: '时间点，用于在指定时间触发回掉，单位为毫秒或者百分比',
        required: true,
    },
    {
        name: 'callback',
        type: 'function',
        default: '() => {}',
        description: '回调函数',
        required: true,
    }
]
</script>
