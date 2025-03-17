import { defineConfig } from 'vitepress'
import { resolve } from 'path'
import { text } from 'stream/consumers'

// 按首字母排序函数
const sortByFirstLetter = (items) => {
  return [...items].sort((a, b) => a.text.toLowerCase().localeCompare(b.text.toLowerCase()))
}

// https://vitepress.dev/reference/site-config

export default defineConfig({
  appearance: true,
  base: '/',
  title: 'CP-VueDir',
  description: 'Vue 3 指令集合, 让你的 Vue 3 项目更加强大',
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: '/vuedir/logo.jpg' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }]
  ],
  vite: {
    resolve: {
      alias: {
        '@cp-vuedir/core': resolve(__dirname, '../../core/src')
      }
    }
  },
  themeConfig: {
    logo: '/logo.jpg',
    lastUpdatedText: '最后更新时间',
    editLink: {
      pattern: 'https://github.com/CodePaintStudio/vuedir/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/CodePaintStudio/vuedir/tree/main'
      },
      {
        icon: 'npm',
        link: 'https://www.npmjs.com/package/@cp-vuedir/core'
      }
    ],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },
    nav: [
      { text: '开始', link: '/guide/' },
      { text: '指令集', link: '/directives/' },
      { text: 'Hooks', link: '/hooks/' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '快速开始',
          items: [{ text: '安装', link: '/guide/' }]
        },
        {
          text: '开发者指南',
          items: [
            { text: '启动', link: '/guide/run' },
            { text: '贡献', link: '/guide/contributing' }
          ]
        }
      ],
      '/directives/': [
        {
          text: 'CP-VueDir 指令集',
          items: [
            { text: '指令集预览', link: '/directives/' },
            {
              text: '交互类',
              items: sortByFirstLetter([
                { text: 'backtop', link: '/directives/backtop' },
                { text: 'clickout', link: '/directives/clickout' },
                { text: 'copy', link: '/directives/copy' },
                { text: 'closetab', link: '/directives/closetab' },
                { text: 'doubleclick', link: '/directives/doubleclick' },
                { text: 'debounce', link: '/directives/debounce' },
                { text: 'drag', link: '/directives/drag' },
                { text: 'draggablesort', link: '/directives/draggablesort' },
                { text: 'fullscreen', link: '/directives/fullscreen' },
                { text: 'hotkey', link: '/directives/hotkey' },
                { text: 'infinitescroll', link: '/directives/infinitescroll' },
                { text: 'longpress', link: '/directives/longpress' },
                { text: 'mousefollow', link: '/directives/mousefollow' },
                { text: 'magnet', link: '/directives/magnet' },
                { text: 'scrollto', link: '/directives/scrollto' },
                { text: 'threeclick', link: '/directives/threeclick' },
                { text: 'throttle', link: '/directives/throttle' },
                { text: 'tooltip', link: '/directives/tooltip' },
                { text: 'timetrack', link: '/directives/timetrack' }
              ])
            },
            {
              text: '视觉类',
              items: sortByFirstLetter([
                { text: 'autobox', link: '/directives/autobox' },
                { text: 'boxresize', link: '/directives/boxresize' },
                { text: 'countup', link: '/directives/countup' },
                { text: 'confetti', link: '/directives/confetti' },
                { text: 'desaturate', link: '/directives/desaturate' },
                { text: 'ellipsis', link: '/directives/ellipsis' },
                { text: 'fitfont', link: '/directives/fitfont' },
                { text: 'highlight', link: '/directives/highlight' },
                { text: 'marquee', link: '/directives/marquee' },
                { text: 'particle', link: '/directives/particle' },
                { text: 'ripple', link: '/directives/ripple' },
                { text: 'top', link: '/directives/top' },
                { text: 'watermarker', link: '/directives/watermarker' },
                { text: 'headerscroll', link: '/directives/headerscroll' },
                { text: 'loading', link: '/directives/loading' },
                { text: 'gradient', link: '/directives/gradient' },
                { text: 'invertcolors', link: '/directives/invertcolors' },
                { text: 'progress', link: '/directives/progress' },
                { text: 'typing', link: '/directives/typing' },
                { text: 'appleblur', link: '/directives/appleblur' },
                { text: 'skeleton', link: '/directives/skeleton' },
                { text: 'priceanimate', link: '/directives/priceanimate' },
                { text: "audiopectrum", link: "/directives/audiopectrum" }
              ])
            },
            {
              text: '表单类',
              items: sortByFirstLetter([
                { text: 'autoinputtype', link: '/directives/autoinputtype' },
                { text: 'clearabel', link: '/directives/clearable' },
                { text: 'emoji', link: '/directives/emoji' },
                { text: 'focus', link: '/directives/focus' },
                { text: 'pwdvisible', link: '/directives/pwdvisible' },
                { text: 'trim', link: '/directives/trim' },
                { text: 'verify', link: '/directives/verify' },
                { text: 'fomatter', link: '/directives/fomatter' }
              ])
            },
            {
              text: '性能优化类',
              items: sortByFirstLetter([
                { text: 'lazyload', link: '/directives/lazyload' },
                { text: 'preload', link: '/directives/preload' },
                { text: 'spare', link: '/directives/spare' },
                { text: 'virtualList', link: '/directives/virtualList' },
              ])
            },
            {
              text: '工具类',
              items: sortByFirstLetter([
                { text: 'i18n', link: '/directives/i18n' },
                { text: 'conversionImage', link: '/directives/conversionImage' }
              ])
            }
          ]
        }
      ],
      '/demo/': [
        {
          text: '演示',
          items: [{ text: '预加载演示', link: '/demo/preload-demo' }]
        }
      ],
      '/hooks/': [
        {
          text: 'Hooks 集合',
          items: [
            { text: '关于hooks', link: '/hooks/' },
            {
              text: 'Hooks',
              items: sortByFirstLetter([
                { text: 'useLanguage', link: '/hooks/uselanguage' },
                { text: 'useMouse', link: '/hooks/usemouse' },
                { text: 'useObserver', link: '/hooks/useobserver' },
                { text: 'useStorage', link: '/hooks/usestorage' }
              ])
            }
          ]
        }
      ]
    }
  },
  vue: {
    template: {}
  }
})
