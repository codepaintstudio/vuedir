import { inject, Ref } from 'vue'

export const useLanguage = () => {
  const currentLanguage = inject('currentLanguage') as Ref<string>

  const setLanguage = (lang: string) => {
    currentLanguage.value = lang
  }

  return {
    currentLanguage,
    setLanguage
  }
}
