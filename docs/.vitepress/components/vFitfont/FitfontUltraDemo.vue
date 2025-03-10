<template>
  <div class="demo-container">
    <p v-fitfont="{ minFontSize: 10, maxFontSize: 30, ratio: 1 }" class="Fitfont-text-1">
      “心外无物，心外无理。” （一切事物的道理都在心中，心是万物的根本。） “圣人之道，吾性自足，不假外求。”
      （每个人内心都具备成为圣人的潜质，无需向外寻求真理。） “天地万物与人原是一体，其发窍之最精处，是人心一点灵明。”
      （天地万物与人本为一体，而人心的灵明是最关键的枢纽。）
      “你未看此花时，此花与汝心同归于寂；你来看此花时，则此花颜色一时明白起来。”
      （心与物的关系是相互依存的，事物的意义因心的感知而显现。）
    </p>
    <p v-fitfont="{ minFontSize: 10, maxFontSize: 30, ratio: 0.9 }" class="Fitfont-text-2">
      “知者行之始，行者知之成。” （知识是行动的起点，行动是知识的完成。） “真知即所以为行，不行不足谓之知。”
      （真正的知识必然能付诸行动，不能付诸行动的知识不是真知。） “未有知而不行者，知而不行，只是未知。”
      （知道却不去实践，说明并没有真正理解。）
    </p>
  </div>
</template>
<script setup>
import { vFitfont } from '@cp-vuedir/core'
</script>
<style scoped>
.demo-container {
  width: 100%;
  height: 300px;
}

.Fitfont-text-1 {
  width: 100%;
  height: 60%;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 10px;
}

.Fitfont-text-2 {
  width: 100%;
  height: 35%;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 10px;
}
</style>
