# 指令集预览

<script setup>
import { ref, computed } from 'vue';

const directives = ref([
  {
    name: 'v-backtop',
    description: '返回顶部指令，当页面滚动到一定高度时显示返回顶部按钮',
    link: '/directives/backtop',
    category: '交互类'
  },
  {
    name: 'v-copy',
    description: '一键复制文本内容，支持动态文本和复制状态反馈',
    link: '/directives/copy',
    category: '交互类'
  },
  {
    name: 'v-clickout',
    description: '点击外部处理函数，支持自定义点击外部处理函数',
    link: '/directives/clickout',
    category: '交互类'
  },
  {
    name: 'v-hotkey',
    description: '监听键盘事件，支持自定义多个快捷键和回掉函数',
    link: '/directives/hotkey',
    category: '交互类'
  },
  {
    name: 'v-tooltip',
    description: '为元素添加悬浮提示，支持自定义提示内容和位置',
    link: '/directives/tooltip',
    category: '交互类'
  },
  {
    name: 'v-emoji',
    description: '禁止表情符号输入功能，防止在表单中用户输入表情符号',
    link: '/directives/emoji',
    category: '表单类'
  },
  {
    name: "v-trim",
    description: "去除输入框首尾空格，防止用户输入空格",
    link: "/directives/trim",
    category: "表单类"
  },
  {
    name: "v-ellipsis",
    description: '文本溢出时自动添加省略号，支持自定义行数',
    link: '/directives/ellipsis',
    category: '视觉类'
  },
  {
    name: 'v-focus',
    description: '自动聚焦表单元素，提升表单交互体验',
    link: '/directives/focus',
    category: '表单类'
  },
  {
    name: "v-pwdvisible",
    description: "密码可见性切换功能",
    link: "/directives/pwdvisible",
    category: '表单类'
  },
  {
    name: "v-clearable",
    description: "为输入框或文本域添加一个清除按钮，点击后可以快速清空内容",
    link: "/directives/clearable",
    category: '表单类'
  },
  {
    name: "v-debounce",
    description: "防抖函数，用于减少事件触发频率",
    link: "/directives/debounce",
    category: '交互类'
  },
  {
    name: "v-throttle",
    description: "节流函数，用于控制事件触发频率",
    link: "/directives/throttle",
    category: '交互类'
  },
  {
    name: 'v-highlight',
    description: '灵活的文本高亮效果，支持多种颜色格式和自动对比度',
    link: '/directives/highlight',
    category: '视觉类'
  },
  {
    name: 'v-watermarker',
    description: '为元素添加水印效果，支持自定义水印文本和样式',
    link: '/directives/watermarker',
    category: '视觉类'
  },
  {
    name: 'v-longpress',
    description: '长按事件功能，支持自定义长按时间',
    link: '/directives/longpress',
    category: '交互类'
  },
  {
    name: 'v-scroolto',
    description: '滚动到指定元素，支持自定义滚动行为',
    link: '/directives/scrollto',
    category: '交互类'
  },
  {
    name: 'v-spare',
    description: '处理图片加载失败场景，自动切换到备用图片',
    link: '/directives/spare',
    category: '视觉类'
  },
  {
    name: 'v-doubleclick',
    description: '双击事件处理，提供更丰富的交互方式',
    link: '/directives/doubleclick',
    category: '交互类'
  },
  {
    name: 'v-threeclick',
    description: '三击事件处理，支持自定义三击时间',
    link: '/directives/threeclick',
    category: '交互类'
  },
  {
    name: "v-drag",
    description: '创建可拖动的元素，支持设置范围、设置回掉函数',
    link: '/directives/drag',
    category: '交互类'
  },
  {
    name: 'v-ripple',
    description: '给目标元素添加水波纹效果，支持自定义波纹颜色和时长',
    link: '/directives/ripple',
    category: '视觉类'
  },
  {
    name: 'v-countup',
    description: '数字滚动动画效果，支持指定目标数值或使用元素内容作为目标值',
    link: '/directives/countup',
    category: '视觉类'
  },
  {
    name: 'v-lazyload',
    description: '图片懒加载功能，支持自定义加载时机',
    link: '/directives/lazyload',
    category: '视觉类'
  },{
    name: 'v-fitfont',
    description: '根据容器的大小动态调整文本的字体大小',
    link: '/directives/fitfont',
    category: '视觉类'
  },{
    name:'v-autobox',
    description: '自动调整box大小以适应其内容',
    link: '/directives/autobox',
    category: '视觉类'
  },{
    name: 'v-boxresize',
    description: '监听元素的尺寸变化，并在尺寸变化时触发回调函数',
    link: '/directives/boxresize',
    category: '交互类'
  }, {
    name: 'v-verify',
    description: '表单验证功能，支持自定义验证规则和错误提示',
    link: '/directives/verify',
    category: '表单类'
  },{
    name:'v-draggablesort',
    description: '拖拽元素来重新排序列表，并且在拖拽完成后更新数据',
    link: '/directives/draggablesort',
    category: '交互类'
  },{
    name: 'v-loading',
    description: '显示加载动画',
    link: '/directives/loading',
    category: '交互类'
  }
]);

const categories = {
  '交互类': 'var(--vp-c-brand)',
  '视觉类': 'var(--vp-c-green)',
  '表单类': 'var(--vp-c-yellow)'
};

const groupedDirectives = computed(() => {
  const groups = {};
  directives.value.forEach(directive => {
    if (!groups[directive.category]) {
      groups[directive.category] = [];
    }
    groups[directive.category].push(directive);
  });
  return groups;
});
</script>

<style>
.category-section {
  margin-bottom: 3rem;
}

.category-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
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
  padding: 1.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.directive-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand);
}

.directive-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  margin-bottom: 0.75rem;
}

.directive-description {
  color: var(--vp-c-text-2);
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  flex-grow: 1;
}
</style>

<template v-for="(directives, category) in groupedDirectives" :key="category">
  <div class="category-section">
    <h2 class="category-title" :style="{ color: categories[category] }">
      {{ category }}
    </h2>
    <div class="directive-grid">
      <a
        v-for="directive in directives"
        :key="directive.name"
        :href="directive.link"
        class="directive-card"
      >
        <div class="directive-name">{{ directive.name }}</div>
        <div class="directive-description">{{ directive.description }}</div>
      </a>
    </div>
  </div>
</template>
