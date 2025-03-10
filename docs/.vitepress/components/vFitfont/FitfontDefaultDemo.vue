<template>
  <div class="demo-container">
    <p v-fitfont class="Fitfont-text-1">
      知为行之始，行为知之成，唯有知行相资以为用，方能臻于至善之境。
      躬身践行以求真知，心领神会而达妙境，此乃知行合一之要津也。
      夫君子之道，贵在知行合一，不徒托空言，必见诸行事而笃实之。
    </p>
    <p v-fitfont class="Fitfont-text-2">
      知是行的先导，行是知的归宿，做到知行合一，才能不断超越自我。 以知促行，以行践知，坚持知行合一，成功定会属于你。
      不做语言的巨人、行动的矮子，将知行合一付诸实践，成就更好的自己 。
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
