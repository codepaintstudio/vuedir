// directives/vI18n.ts
import { Directive, Ref, ref, watch, App } from 'vue'

export const createI18n = () => {
  const currentLanguage: Ref<string> = ref('en')

  const vI18n: Directive = {
    mounted(el, binding) {
      const updateText = () => {
        el.textContent = binding.value[currentLanguage.value] || binding.value['en'] || ''
      }
      updateText()
      el._i18nWatcher = watch(currentLanguage, updateText)
    },
    updated(el, binding) {
      el.textContent = binding.value[currentLanguage.value] || binding.value['en'] || ''
    },
    unmounted(el) {
      if (el._i18nWatcher) {
        el._i18nWatcher()
      }
    }
  }

  return {
    vI18n,
    currentLanguage
  }
}
