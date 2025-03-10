import type { App } from "vue";
import { vBacktop } from "./directives/vBacktop";
import { vFocus } from "./directives/vFocus";
import { vCopy } from "./directives/vCopy";
import { vHighlight } from "./directives/vHighlight";
import { vLongpress } from "./directives/vLongpress";
import { vDoubleClick } from "./directives/vDoubleClick";
import { vSpare } from "./directives/vSpare";
import { vCountup } from "./directives/vCountup";
import { vLazyload } from "./directives/vLazyload";
import { vPwdvisible } from "./directives/vPwdvisible";
import { vDebounce } from "./directives/vDebounce";
import { vThrottle } from "./directives/vThrottle";
import { vClearable } from "./directives/vClearable";
import { vWatermarker } from "./directives/vWatermarker";
import { vThreeClick } from "./directives/vThreeClick";
import { vDrag } from "./directives/vDrag";
import { vRipple } from "./directives/vRipple";
import { vEmoji } from "./directives/vEmoji";
import { vEllipsis } from "./directives/vEllipsis/core";
import { vHotkey } from "./directives/vHotkey";
import { vTooltip } from "./directives/vTooltip";
import { vFitfont } from "./directives/vFitfont";
import { vScrollTo } from "./directives/vScrollTo";
import { vClickout } from "./directives/vClickout";
import { vBoxResize } from "./directives/vBoxResize";
import { vAutobox } from "./directives/vAutobox";
import { vTrim } from "./directives/vTrim";
import { vVerify } from "./directives/vVerify";
import { vDraggableSort } from "./directives/vDraggableSort";
import { vTop } from "./directives/vTop";
import { vLoading } from "./directives/vLoading";

export {
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
};

export interface CPVueDirPlugin {
  install(app: App): void;
}

const VueDir: CPVueDirPlugin = {
  install(app: App) {
    app.directive("backtop", vBacktop);
    app.directive("focus", vFocus);
    app.directive("copy", vCopy);
    app.directive("highlight", vHighlight);
    app.directive("longpress", vLongpress);
    app.directive("doubleclick", vDoubleClick);
    app.directive("spare", vSpare);
    app.directive("countup", vCountup);
    app.directive("lazyload", vLazyload);
    app.directive("pwdvisible", vPwdvisible);
    app.directive("debounce", vDebounce);
    app.directive("throttle", vThrottle);
    app.directive("clearable", vClearable);
    app.directive("watermarker", vWatermarker);
    app.directive("threeclick", vThreeClick);
    app.directive("drag", vDrag);
    app.directive("ripple", vRipple);
    app.directive("emoji", vEmoji);
    app.directive("ellipsis", vEllipsis);
    app.directive("hotkey", vHotkey);
    app.directive("tooltip", vTooltip);
    app.directive("fitfonte", vFitfont);
    app.directive("autobox", vAutobox);
    app.directive("scrollto", vScrollTo);
    app.directive("boxresize", vBoxResize);
    app.directive("trim", vTrim);
    app.directive("verify", vVerify);
    app.directive("draggablesort", vDraggableSort);
    app.directive("top", vTop);
    app.directive("loading", vLoading);
  },
};

export default VueDir;
