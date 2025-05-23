<script setup>
import { ref, computed, onMounted } from 'vue'
import { vTyping, vBacktop, useObserver, vDesaturate } from '@cp-vuedir/core'

const isBottom = ref(false)
const bottomRef = ref(null)

const groupedDirectives = computed(() => {
  const groups = {}
  directives.value.sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
  directives.value.forEach((directive) => {
    if (!groups[directive.category]) {
      groups[directive.category] = []
    }
    groups[directive.category].push(directive)
  })
  return groups
})

onMounted(() => {
  useObserver(bottomRef, {
    intersection: {
      enabled: true,
      options: { threshold: 1.0 },
      callback: (entries) => {
        const [entry] = entries
        entry.isIntersecting ? (isBottom.value = true) : (isBottom.value = false)
        const el = bottomRef.value?.$el || bottomRef.value

        if (el && el.classList) {
          entry.isIntersecting ? el.classList.add('vibrate-3') : el.classList.remove('vibrate-3')
        }
      }
    }
  })
})

const directives = ref([
  {
    name: 'timetrack',
    description: '用于媒体元素的指令，当达到指定时间时触发回调函数，支持数组形式的多个时间点',
    category: '交互类'
  },
  {
    name: 'backtop',
    description: '返回顶部指令，当页面滚动到一定高度时显示返回顶部按钮',
    category: '交互类'
  },
  {
    name: 'copy',
    description: '一键复制文本内容，支持动态文本和复制状态反馈',
    category: '交互类'
  },
  {
    name: 'clickout',
    description: '点击外部处理函数，支持自定义点击外部处理函数',
    category: '交互类'
  },
  {
    name: 'hotkey',
    description: '监听键盘事件，支持自定义多个快捷键和回掉函数',
    category: '交互类'
  },
  {
    name: 'tooltip',
    description: '为元素添加悬浮提示，支持自定义提示内容和位置',
    category: '交互类'
  },
  {
    name: 'preload',
    description: '预加载指令，支持页面预加载和资源预加载',
    category: '性能优化类'
  },
  {
    name: 'emoji',
    description: '禁止表情符号输入功能，防止在表单中用户输入表情符号',
    category: '表单类'
  },
  {
    name: 'trim',
    description: '去除输入框首尾空格，防止用户输入空格',
    category: '表单类'
  },
  {
    name: 'ellipsis',
    description: '文本溢出时自动添加省略号，支持自定义行数',
    category: '视觉类'
  },
  {
    name: 'focus',
    description: '自动聚焦表单元素，提升表单交互体验',
    category: '表单类'
  },
  {
    name: 'pwdvisible',
    description: '密码可见性切换功能',
    category: '表单类'
  },
  {
    name: 'clearable',
    description: '为输入框或文本域添加一个清除按钮，点击后可以快速清空内容',
    category: '表单类'
  },
  {
    name: 'debounce',
    description: '防抖函数，用于减少事件触发频率',
    category: '交互类'
  },
  {
    name: 'throttle',
    description: '节流函数，用于控制事件触发频率',
    category: '交互类'
  },
  {
    name: 'highlight',
    description: '灵活的文本高亮效果，支持多种颜色格式和自动对比度',
    category: '视觉类'
  },
  {
    name: 'watermarker',
    description: '为元素添加水印效果，支持自定义水印文本和样式',
    category: '视觉类'
  },
  {
    name: 'longpress',
    description: '长按事件功能，支持自定义长按时间',
    category: '交互类'
  },
  {
    name: 'scrollto',
    description: '滚动到指定元素，支持自定义滚动行为',
    category: '交互类'
  },
  {
    name: 'spare',
    description: '处理图片加载失败场景，自动切换到备用图片',
    category: '性能优化类'
  },
  {
    name: 'doubleclick',
    description: '双击事件处理，提供更丰富的交互方式',
    category: '交互类'
  },
  {
    name: 'threeclick',
    description: '三击事件处理，支持自定义三击时间',
    category: '交互类'
  },
  {
    name: 'drag',
    description: '创建可拖动的元素，支持设置范围、设置回掉函数',
    category: '交互类'
  },
  {
    name: 'ripple',
    description: '给目标元素添加水波纹效果，支持自定义波纹颜色和时长',
    category: '视觉类'
  },
  {
    name: 'countup',
    description: '数字滚动动画效果，支持指定目标数值或使用元素内容作为目标值',
    category: '视觉类'
  },
  {
    name: 'lazyload',
    description: '图片懒加载功能，支持自定义加载时机',
    category: '性能优化类'
  },
  {
    name: 'fitfont',
    description: '根据容器的大小动态调整文本的字体大小',
    category: '视觉类'
  },
  {
    name: 'autobox',
    description: '自动调整box大小以适应其内容',
    category: '视觉类'
  },
  {
    name: 'boxresize',
    description: '监听元素的尺寸变化，并在尺寸变化时触发回调函数',
    category: '视觉类'
  },
  {
    name: 'verify',
    description: '表单验证功能，支持自定义验证规则和错误提示',
    category: '表单类'
  },
  {
    name: 'draggablesort',
    description: '拖拽元素来重新排序列表，并且在拖拽完成后更新数据',
    category: '交互类'
  },
  {
    name: 'autoinputtype',
    description: '根据输入内容自动切换输入框类型，例如在输入邮箱时自动切换到邮箱输入框',
    category: '表单类'
  },
  {
    name: 'fullscreen',
    description: '点击元素全屏显示，再次点击退出全屏',
    category: '交互类'
  },
  {
    name: 'infinitescroll',
    description: '实现无限滚动功能，当滚动到底部时触发加载更多数据',
    category: '交互类'
  },
  {
    name: 'mousefollow',
    description: '鼠标跟随指令，支持自定义跟随元素和位置',
    category: '交互类'
  },
  {
    name: 'marquee',
    description: '实现文本滚动效果，支持自定义滚动速度和方向',
    category: '视觉类'
  },
  {
    name: 'top',
    description: '永远使得元素图层最高！',
    category: '视觉类'
  },
  {
    name: 'desaturate',
    description: '一键开启网页灰色素调，至远方',
    category: '视觉类'
  },
  {
    name: 'closetab',
    description: '关闭当前浏览器标签页',
    category: '交互类'
  },
  {
    name: 'headerscroll',
    description: '控制顶部header的显示和隐藏',
    category: '视觉类'
  },
  {
    name: 'loading',
    description: '显示加载动画',
    category: '视觉类'
  },
  {
    name: 'particle',
    description: '点击粒子爆炸效果',
    category: '视觉类'
  },
  {
    name: 'invertcolors',
    description: '实现文字颜色和背景色的反转效果',
    category: '视觉类'
  },
  {
    name: 'confetti',
    description: '点击元素触发全屏五彩纸屑动画效果',
    category: '视觉类'
  },
  {
    name: 'gradient',
    description: '为元素添加渐变背景流动效果',
    category: '视觉类'
  },
  {
    name: 'typing',
    description: '模拟打字机效果的指令，支持速度控制和状态回调，让文本展示更生动有趣。',
    category: '视觉类'
  },
  {
    name: 'progress',
    description: '实时进度条（绑定数值自动渲染环形/条形进度）',
    category: '视觉类'
  },
  {
    name: 'magnet',
    description: '元素磁化，支持定义磁力、磁性',
    category: '视觉类'
  },
  {
    name: 'appleblur',
    description: '苹果毛玻璃效果',
    category: '视觉类'
  },
  {
    name: 'i18n',
    description: 'i18n，更轻量级、指令化的国际化方案。',
    category: '工具类'
  },
  {
    name: 'virtuallist',
    description: '虚拟列表，用于渲染大量数据时提升性能',
    category: '性能优化类'
  },
  {
    name: 'priceanimate',
    description: '动态价格变动效果',
    category: '视觉类'
  },
  {
    name: 'audiopectrum',
    description: '音频频谱可视化效果',
    category: '视觉类'
  },
  {
    name: 'skeleton',
    description: '骨架屏，用于在数据加载过程中显示占位符，提升用户体验',
    category: '视觉类'
  },
  {
    name: 'fomatter',
    description: '格式化文本，支持多种格式化方式，如日期、字节、货币',
    category: '表单类'
  },
  {
    name: 'conversionimage',
    description: '将图片转换为Base64编码',
    category: '工具类'
  },
  {
    name: 'outview',
    description: '元素是否在可视区域',
    category: '视觉类'
  }
])
</script>

<template>
  <h1 v-typing>指令集预览 - {{ directives.length }}个</h1>
  <div v-for="(directives, category) in groupedDirectives" :key="category">
    <div class="category-section">
      <h3 class="category-title">{{ category }} - {{ groupedDirectives[category].length }}个</h3>
      <div class="directive-grid">
        <a
          v-for="directive in directives"
          :key="directive.name"
          :href="`/directives/${directive.name}`"
          class="directive-card"
        >
          <div class="directive-name">{{ directive.name }}</div>
          <hr style="width: 100%" />
          <div class="directive-description">{{ directive.description }}</div>
        </a>
      </div>
    </div>
  </div>
  <a-button ref="bottomRef" v-desaturate="{ isOn: isBottom }" type="primary" long size="large" shape="round" v-backtop>
    返回顶部
  </a-button>
</template>
<style scoped>
.category-section {
  margin-bottom: 3rem;
}

.category-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.directive-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin: 1rem 0;
}

@media (max-width: 1200px) {
  .directive-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .directive-grid {
    grid-template-columns: 1fr;
  }
}

.directive-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  text-decoration: none;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.directive-card:hover {
  transform: translateY(-4px) scale(1.05);
  border-color: var(--vp-c-brand);
}

.directive-name {
  margin: 1rem;
  margin-bottom: 0rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-brand);
}

.directive-description {
  margin: 1rem;
  margin-top: 0rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  flex-grow: 1;
}

.vibrate-3 {
  -webkit-animation: vibrate-3 0.5s linear infinite reverse both;
  animation: vibrate-3 0.5s linear infinite reverse both;
}

@-webkit-keyframes vibrate-3 {
  0% {
    -webkit-transform: translate(0);
    transform: translate(0);
  }
  10% {
    -webkit-transform: translate(-2px, -2px);
    transform: translate(-2px, -2px);
  }
  20% {
    -webkit-transform: translate(2px, -2px);
    transform: translate(2px, -2px);
  }
  30% {
    -webkit-transform: translate(-2px, 2px);
    transform: translate(-2px, 2px);
  }
  40% {
    -webkit-transform: translate(2px, 2px);
    transform: translate(2px, 2px);
  }
  50% {
    -webkit-transform: translate(-2px, -2px);
    transform: translate(-2px, -2px);
  }
  60% {
    -webkit-transform: translate(2px, -2px);
    transform: translate(2px, -2px);
  }
  70% {
    -webkit-transform: translate(-2px, 2px);
    transform: translate(-2px, 2px);
  }
  80% {
    -webkit-transform: translate(-2px, -2px);
    transform: translate(-2px, -2px);
  }
  90% {
    -webkit-transform: translate(2px, -2px);
    transform: translate(2px, -2px);
  }
  100% {
    -webkit-transform: translate(0);
    transform: translate(0);
  }
}
@keyframes vibrate-3 {
  0% {
    -webkit-transform: translate(0);
    transform: translate(0);
  }
  10% {
    -webkit-transform: translate(-2px, -2px);
    transform: translate(-2px, -2px);
  }
  20% {
    -webkit-transform: translate(2px, -2px);
    transform: translate(2px, -2px);
  }
  30% {
    -webkit-transform: translate(-2px, 2px);
    transform: translate(-2px, 2px);
  }
  40% {
    -webkit-transform: translate(2px, 2px);
    transform: translate(2px, 2px);
  }
  50% {
    -webkit-transform: translate(-2px, -2px);
    transform: translate(-2px, -2px);
  }
  60% {
    -webkit-transform: translate(2px, -2px);
    transform: translate(2px, -2px);
  }
  70% {
    -webkit-transform: translate(-2px, 2px);
    transform: translate(-2px, 2px);
  }
  80% {
    -webkit-transform: translate(-2px, -2px);
    transform: translate(-2px, -2px);
  }
  90% {
    -webkit-transform: translate(2px, -2px);
    transform: translate(2px, -2px);
  }
  100% {
    -webkit-transform: translate(0);
    transform: translate(0);
  }
}
</style>
