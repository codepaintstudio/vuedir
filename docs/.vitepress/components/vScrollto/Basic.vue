<template>
  <div class="container">
    <a-button type="primary" shape="round" size="large" long v-scrollTo="{ to: targetRef }" class="button"
      >点击读完文章</a-button
    >
    <a-typography>
      <a-typography-title>端午的鸭蛋</a-typography-title>
      <a-typography-text>作者：汪曾祺</a-typography-text>
      <a-typography-paragraph>
        家乡的端午，很多风俗和外地一样。系百索子。五色的丝线拧成小绳，系在手腕上。丝线是掉色的，洗脸时沾了水，手腕上就印得红一道绿一道的。做香角子。丝丝缠成小粽子，里头装了香面，一个一个串起来，挂在帐钩上。贴五毒。红纸剪成五毒，贴在门槛上。贴符。这符是城隍庙送来的。城隍庙的老道士还是我的寄名干爹，他每年端午节前就派小道士送符来，还有两把小纸扇。符送来了，就贴在堂屋的门楣上。一尺来长的黄色、蓝色的纸条，上面用朱笔画些莫名其妙的道道，这就能辟邪么？喝雄黄酒。用酒和的雄黄在孩子的额头上画一个王字，这是很多地方都有的。有一个风俗不知别处有不：放黄烟子。黄烟子是大小如北方的麻雷子的炮仗，只是里面灌的不是硝药，而是雄黄。点着后不响，只是冒出一股黄烟，能冒好一会。把点着的黄烟子丢在橱柜下面，说是可以熏五毒。小孩子点了黄烟子，常把它的一头抵在板壁上写虎字。写黄烟虎字笔画不能断，所以我们那里的孩子都会写草书的“一笔虎”。还有一个风俗，是端午节的午饭要吃“十二红”，就是十二道红颜色的菜。十二红里我只记得有炒红苋菜、油爆虾、咸鸭蛋，其余的都记不清，数不出了。也许十二红只是一个名目，不一定真凑足十二样。不过午饭的菜都是红的，这一点是我没有记错的，而且，苋菜、虾、鸭蛋，一定是有的。这三样，在我的家乡，都不贵，多数人家是吃得起的。
      </a-typography-paragraph>
      <a-typography-paragraph>
        我的家乡是水乡。出鸭。高邮大麻鸭是著名的鸭种。鸭多，鸭蛋也多。高邮人也善于腌鸭蛋。高邮咸鸭蛋于是出了名。我在苏南、浙江，每逢有人问起我的籍贯，回答之后，对方就会肃然起敬：“哦！你们那里出咸鸭蛋！”上海的卖腌腊的店铺里也卖咸鸭蛋，必用纸条特别标明：“高邮咸蛋”。高邮还出双黄鸭蛋。别处鸭蛋也偶有双黄的，但不如高邮的多，可以成批输出。双黄鸭蛋味道其实无特别处。还不就是个鸭蛋！只是切开之后，里面圆圆的两个黄，使人惊奇不已。我对异乡人称道高邮鸭蛋，是不大高兴的，好像我们那穷地方就出鸭蛋似的！不过高邮的咸鸭蛋，确实是好，我走的地方不少，所食鸭蛋多矣，但和我家乡的完全不能相比！曾经沧海难为水，他乡咸鸭蛋，我实在瞧不上。袁枚的《随园食单·小菜单》有“腌蛋”一条。袁子才这个人我不喜欢，他的《食单》好些菜的做法是听来的，他自己并不会做菜。但是《腌蛋》这一条我看后却觉得很亲切，而且“与有荣焉”。文不长，录如下：
      </a-typography-paragraph>
      <a-typography-paragraph>
        腌蛋以高邮为佳，颜色细而油多，高文端公最喜食之。席间，先夹取以敬客，放盘中。总宜切开带壳，黄白兼用；不可存黄去白，使味不全，油亦走散。
      </a-typography-paragraph>
      <a-typography-paragraph>
        高邮咸蛋的特点是质细而油多。蛋白柔嫩，不似别处的发干、发粉，入口如嚼石灰。油多尤为别处所不及。鸭蛋的吃法，如袁子才所说，带壳切开，是一种，那是席间待客的办法。平常食用，一般都是敲破“空头”用筷子挖着吃。筷子头一扎下去，吱——红油就冒出来了。高邮咸蛋的黄是通红的。苏北有一道名菜，叫做“朱砂豆腐”，就是用高邮鸭蛋黄炒的豆腐。我在北京吃的咸鸭蛋，蛋黄是浅黄色的，这叫什么咸鸭蛋呢！
      </a-typography-paragraph>
    </a-typography>
    <div ref="targetRef" class="target">目标元素</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { vScrollTo } from '@cp-vuedir/core'

const targetRef = ref<HTMLElement | null>(null)
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
