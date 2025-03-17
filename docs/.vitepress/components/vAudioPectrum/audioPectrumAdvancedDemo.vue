<template>
    <div class="demo-container">
        <audio v-audiopectrum="options" controls :src="audioUrl"></audio>

        <div class="controls">
            <div class="control-group">
                <label>显示模式：
                    <select v-model="options.mode">
                        <option value="bars">柱状图</option>
                        <option value="waveform">波形图</option>
                        <option value="circular">圆形模式</option>
                    </select>
                </label>
            </div>

            <div class="control-group" v-if="options.mode === 'circular'">
                <h4>圆形特效参数</h4>
                <label>脉冲间隔：
                    <input type="range" v-model.number="options.circlePulseInterval" min="50" max="500">
                    {{ options.circlePulseInterval }}ms
                </label>

                <label>生命周期：
                    <input type="range" v-model.number="options.circleLifetime" min="500" max="2000">
                    {{ options.circleLifetime }}ms
                </label>

                <label>最大数量：
                    <input type="range" v-model.number="options.circleMaxCount" min="1" max="10">
                    {{ options.circleMaxCount }}
                </label>
            </div>

            <div class="color-picker">
                <label>起始颜色：
                    <input type="color" v-model="options.colors.start">
                </label>
                <label>结束颜色：
                    <input type="color" v-model="options.colors.end">
                </label>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const audioUrl = ref('../../../public/directives/audiopectrum/trun the lights back on.mp3')

const options = ref({
    mode: 'circular',
    fftSize: 1024,
    colors: {
        start: '#00ff88',
        end: '#ff0077'
    }
})


</script>

<style scoped>
.demo-container {
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 8px;
    margin: 20px 0;
}

.controls {
    margin-top: 15px;
    padding: 15px;
    background: #f8f8f8;
    border-radius: 6px;
}

.control-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin: 8px 0;
}

input[type="range"] {
    vertical-align: middle;
}

.color-picker input[type="color"] {
    width: 40px;
    height: 30px;
    margin-right: 10px;
}
</style>