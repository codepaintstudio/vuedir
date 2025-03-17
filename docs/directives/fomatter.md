# v-fomatter

## 介绍

用于格式化数据，支持字节、日期、货币、百分比格式化。

## 使用方法

将`v-fomatter`指令绑定到需要格式化的元素上，并设置`value`属性为需要格式化的数据，可以设置`locale`属性来确定当前区域，同时可以设置`options`来确定格式化选项。

<FomatterDemo/>

::: details 查看代码
<<< @/.vitepress/components/vFomatter/FomatterDemo.vue
:::

## API

<ApiTable :data="apiData"/>

### options

<ApiTable :data="optionsData"/>

<script setup>
import FomatterDemo from '../.vitepress/components/vFomatter/FomatterDemo.vue';
import ApiTable from '../.vitepress/components/ApiTable.vue';

const apiData = [
  {
    name: 'value',
    description: '需要格式化的数据',
    type: 'number | Date',
    required: true
  },
  {
    name: 'locale',
    description: '当前区域',
    type: 'string',
    default: 'zh-CN',
    required: false
  },
  {
    name: 'options',
    description: '格式化选项',
    type: 'object',
    required: true
  }
]

const optionsData = [
  {
    name: 'style',
    description: '格式化样式，若需要初始化为货币，需要传值 currency',
    type: 'string',
    required: false
  },
  {
    name: 'currency',
    description: '货币符号',
    type: 'string',
    default: 'CNY',
    required: false
  },
  {
    name: "fractionDigits",
    description: '若数据需要格式化为百分比就传，百分比小数位数',
    type: 'number',
    required: false
  },
  {
    name: 'weekday',
    description: '显示星期几的方式 (narrow、short、long)',
    type: 'string',
    required: false
  },
  {
    name: 'year',
    description: '年份 (2-digit、numeric)',
    type: 'string',
    required: false
  },
  {
    name: 'month',
    description: '月份 (2-digit、numeric、narrow、short、long)',
    type: 'string',
    required: false
  },
  {
    name: 'day',
    description: '显示日期的方式 (2-digit、numeric)。',
    type: 'string',
    required: false
  },
  {
    name: 'hour',
    description: '显示小时的方式 (2-digit、numeric)',
    type: 'string',
    required: false
  },
  {
    name: 'minute',
    description: ' 显示分钟的方式 (2-digit、numeric)。',
    type: 'string',
    required: false
  },
  {
    name: 'second',
    description: ' 显示秒的方式 (2-digit、numeric)',
    type: 'string',
    required: false
  },
  {
    name: 'timeZone',
    description: '显示时区名称的方式 (short、long)',
    type: 'string',
    required: false
  },
  {
    name: 'minimumIntegerDigits',
    description: '最小整数位数',
    type: 'number',
    required: false
  },
  {
    name: 'minimumFractionDigits',
    description: '最小小数位数',
    type: 'number',
    required: false
  },
  {
    name: 'minimumFractionDigits',
    description: '最小小数位数',
    type: 'number',
    required: false
  },
  {
    name: 'maximumFractionDigits',
    description: '最大小数位数',
    type: 'number',
    required: false
  },
]

</script>
