import type { App } from 'vue'

/* Directives here */
import { vBacktop } from './directives/vBacktop'
import { vFocus } from './directives/vFocus'
import { vCopy } from './directives/vCopy'
import { vHighlight } from './directives/vHighlight'
import { vLongpress } from './directives/vLongpress'
import { vDoubleClick } from './directives/vDoubleClick'
import { vSpare } from './directives/vSpare'
import { vCountup } from './directives/vCountup'
import { vLazyload } from './directives/vLazyload'
import { vPwdvisible } from './directives/vPwdvisible'
import { vDebounce } from './directives/vDebounce'
import { vThrottle } from './directives/vThrottle'
import { vClearable } from './directives/vClearable'
import { vWatermarker } from './directives/vWatermarker'
import { vThreeClick } from './directives/vThreeClick'
import { vDrag } from './directives/vDrag'
import { vRipple } from './directives/vRipple'
import { vEmoji } from './directives/vEmoji'
import { vEllipsis } from './directives/vEllipsis/core'
import { vHotkey } from './directives/vHotkey'
import { vTooltip } from './directives/vTooltip'
import { vFitfont } from './directives/vFitfont'
import { vScrollTo } from './directives/vScrollTo'
import { vClickout } from './directives/vClickout'
import { vBoxResize } from './directives/vBoxResize'
import { vAutobox } from './directives/vAutobox'
import { vTrim } from './directives/vTrim'
import { vVerify } from './directives/vVerify'
import { vDraggableSort } from './directives/vDraggableSort'
import { vTop } from './directives/vTop'
import { vAutoInputType } from './directives/vAutoInputType'
import { vFullScreen } from './directives/vFullScreen'
import { vPreload } from './directives/vPreload'
import { vMouseFollow } from './directives/vMouseFollow'
import { vInfiniteScroll } from './directives/vInfiniteScroll'
import { vMarquee } from './directives/vMarquee'
import { vDesaturate } from './directives/vDesaturate'
import { vClosetab } from './directives/vClosetab'
import { vHeaderScroll } from './directives/vHeaderScroll'
import { vLoading } from './directives/vLoading'
import { vParticle } from './directives/vParticle'
import { vInvertColors } from './directives/vInvertColors'
import { vConfetti } from './directives/vConfetti'
import { vTimeTrack } from './directives/vTimeTrack'
import { vGradient } from './directives/vGradient'
import { vTyping } from './directives/vTyping'
import { vProgress } from './directives/vProgress'
import { vMagnet } from './directives/vMagnet'
import { vAppleblur } from './directives/vAppleblur'
import { createI18n } from './directives/vI18n'
import { vVirtualList } from './directives/vVirtualList'
import { vAudioPectrum } from './directives/vAudioPectrum'
import { vPriceAnimate } from './directives/vPriceAnimate'
import { vSkeleton } from './directives/vSkeleton/core'
import { vFomatter } from './directives/vFormatter'
import { vConversionImage } from './directives/vConversionImage'
import { vOutView } from './directives/vOutview'

/* Hooks here */
import { useLanguage } from './hooks/useLanguage'
import { useMouse } from './hooks/useMouse/core'
import { useObserver } from './hooks/useObserver'
import { useStorage } from './hooks/useStorage/core'
export {
  /* Directives here */
  vBacktop,
  vClickout,
  vFocus,
  vCopy,
  vHighlight,
  vLongpress,
  vDoubleClick,
  vSpare,
  vCountup,
  vLazyload,
  vPwdvisible,
  vDebounce,
  vThrottle,
  vClearable,
  vWatermarker,
  vThreeClick,
  vDrag,
  vRipple,
  vEmoji,
  vEllipsis,
  vHotkey,
  vTooltip,
  vFitfont,
  vAutobox,
  vScrollTo,
  vBoxResize,
  vTrim,
  vVerify,
  vDraggableSort,
  vTop,
  vLoading,
  vAutoInputType,
  vFullScreen,
  vPreload,
  vMouseFollow,
  vInfiniteScroll,
  vMarquee,
  vDesaturate,
  vClosetab,
  vHeaderScroll,
  vParticle,
  vConfetti,
  vTimeTrack,
  vGradient,
  vInvertColors,
  vTyping,
  vProgress,
  vMagnet,
  vAppleblur,
  vVirtualList,
  vAudioPectrum,
  vPriceAnimate,
  vSkeleton,
  vFomatter,
  vConversionImage,
  vOutView,


  /* Hooks here */
  useLanguage,
  useMouse,
  useObserver,
  useStorage
}

export interface CPVueDirPlugin {
  install(app: App): void
}

const VueDir: CPVueDirPlugin = {
  install(app: App) {
    const { vI18n, currentLanguage } = createI18n()
    app.provide('currentLanguage', currentLanguage)
    app.config.globalProperties.$i18n = {
      currentLanguage,
      setLanguage: (lang: string) => {
        currentLanguage.value = lang
      }
    }

    app.directive('i18n', vI18n)
    app.directive('backtop', vBacktop)
    app.directive('focus', vFocus)
    app.directive('copy', vCopy)
    app.directive('highlight', vHighlight)
    app.directive('longpress', vLongpress)
    app.directive('doubleclick', vDoubleClick)
    app.directive('clickout', vClickout)
    app.directive('spare', vSpare)
    app.directive('countup', vCountup)
    app.directive('lazyload', vLazyload)
    app.directive('pwdvisible', vPwdvisible)
    app.directive('debounce', vDebounce)
    app.directive('throttle', vThrottle)
    app.directive('clearable', vClearable)
    app.directive('watermarker', vWatermarker)
    app.directive('threeclick', vThreeClick)
    app.directive('drag', vDrag)
    app.directive('ripple', vRipple)
    app.directive('emoji', vEmoji)
    app.directive('ellipsis', vEllipsis)
    app.directive('hotkey', vHotkey)
    app.directive('tooltip', vTooltip)
    app.directive('fitfonte', vFitfont)
    app.directive('autobox', vAutobox)
    app.directive('scrollto', vScrollTo)
    app.directive('boxresize', vBoxResize)
    app.directive('trim', vTrim)
    app.directive('verify', vVerify)
    app.directive('draggablesort', vDraggableSort)
    app.directive('top', vTop)
    app.directive('autoinputtype', vAutoInputType)
    app.directive('fullscreen', vFullScreen)
    app.directive('preload', vPreload)
    app.directive('mousefollow', vMouseFollow)
    app.directive('infinitescroll', vInfiniteScroll)
    app.directive('marquee', vMarquee)
    app.directive('desaturate', vDesaturate)
    app.directive('closetab', vClosetab)
    app.directive('headerscroll', vHeaderScroll)
    app.directive('loading', vLoading)
    app.directive('particle', vParticle)
    app.directive('invertcolors', vInvertColors)
    app.directive('confetti', vConfetti)
    app.directive('timetrack', vTimeTrack)
    app.directive('gradient', vGradient)
    app.directive('typing', vTyping)
    app.directive('progress', vProgress)
    app.directive('magnet', vMagnet)
    app.directive('appleblur', vAppleblur)
    app.directive('VirtualList', vVirtualList)
    app.directive('audiopectrum', vAudioPectrum)
    app.directive('priceanimate', vPriceAnimate)
    app.directive('skeleton', vSkeleton)
    app.directive('fomatter', vFomatter)
    app.directive('conversionimage', vConversionImage)
    app.directive('outview', vOutView)
  }
}

export default VueDir
