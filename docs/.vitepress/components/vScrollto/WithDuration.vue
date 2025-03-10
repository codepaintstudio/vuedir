<template>
  <div class="container">
    <a-button
      type="primary"
      shape="round"
      size="large"
      long
      v-scrollTo="{ to: durationRef, duration: 100 }"
      class="button"
    >
      点击读完文章
    </a-button>

    <a-typography>
      <a-typography-paragraph class="sa-typography-paragraphacer">
        端午节，我们那里的孩子兴挂“鸭蛋络子”。头一天，就由姑姑或姐姐用彩色丝线打好了络子。端午一早，鸭蛋煮熟了，由孩子自己去挑一个，鸭蛋有什么可挑的呢？有！一要挑淡青壳的。鸭蛋壳有白的和淡青的两种。二要挑形状好看的。别说鸭蛋都是一样的，细看却不同。有的样子蠢，有的秀气。挑好了，装在络子里，挂在大襟的纽扣上。这有什么好看呢？然而它是孩子心爱的饰物。鸭蛋络子挂了多半天，什么时候孩子一高兴，就把络子里的鸭蛋掏出来，吃了。端午的鸭蛋，新腌不久，只有一点淡淡的咸味，白嘴吃也可以。
      </a-typography-paragraph>
      <a-typography-paragraph class="spacer">
        孩子吃鸭蛋是很小心的。除了敲去空头，不把蛋壳碰破。蛋黄蛋白吃光了，用清水把鸭蛋壳里面洗净，晚上捉了萤火虫来，装在蛋壳里，空头的地方糊一层薄罗。萤火虫在鸭蛋壳里一闪一闪地亮，好看极了！
      </a-typography-paragraph>
      <a-typography-paragraph class="spacer">
        小时读囊萤映雪故事，觉得东晋的车胤用练囊盛了几十只萤火虫，照了读书，还不如用鸭蛋壳来装萤火虫。不过用萤火虫照亮来读书，而且一夜读到天亮，这能行么？车胤读的是手写的卷子，字大，若是读现在的新五号字，大概是不行的。
      </a-typography-paragraph>
    </a-typography>
    <div class="target" ref="durationRef">目标元素</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { vScrollTo } from '@cp-vuedir/core'

const durationRef = ref<HTMLElement | null>(null)
</script>

<style scoped>
.container {
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.target {
  height: 100px;
  background-color: var(--vp-button-bg);
  color: white;
  border-radius: 8px;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
