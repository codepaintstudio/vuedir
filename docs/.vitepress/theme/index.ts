import DefaultTheme from 'vitepress/theme'
import './custom.css'
import './fonts.css'
import Layout from './Layout.vue'

import VueDir from '@cp-vuedir/core'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(VueDir)
    app.use(ArcoVue)
  },
  Layout
}
