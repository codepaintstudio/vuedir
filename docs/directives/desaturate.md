# v-desatuate

## 简介

`v-desatuate`是一个可以一键开启网页灰色素调的指令，常用在一些特殊时节。

## 使用方法

给任意元素绑定`v-desatuate`的指令，传入一个类型为`boolean`的`isOn`参数即可。

<Demo />

::: details 查看代码

<<< @/.vitepress/components/vDesatuate/Demo.vue

:::

## API

<ApiTable :data="data" />

<script setup>
    import Demo from "../.vitepress/components/vDesatuate/Demo.vue"
    import ApiTable from "../.vitepress/components/ApiTable.vue"

    const data = [
        {
            name: "isOn",
            required: true,
            description: "控制是否开启灰色素调模式",
            type: 'boolean',
            default: 'false'
        }
    ]
</script>
