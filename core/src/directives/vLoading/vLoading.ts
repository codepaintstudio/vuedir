import type { Directive, DirectiveBinding } from "vue";
import type { LoadingType } from "./type";

const style = `
.directives-loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(193, 191, 191, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.directives-loading-spinner {
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  border-left-color: transparent;
  animation: loading-spin 1s linear infinite;
}

.directives-loading-active {
  overflow: hidden;
  pointer-events: none; /* 禁止事件 */
}

@keyframes loading-spin {
  to {
    transform: rotate(360deg);
  }
}
`;
const vLoading : Directive = {
  // 在元素挂载时调用
  mounted(el: LoadingType, binding: DirectiveBinding) {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    // styleSheet.innerText = createKeyframesString(spinKeyframes);
    styleSheet.innerText += style;
    document.head.appendChild(styleSheet);

    // 创建遮罩层
    const overlay = document.createElement("div");
    overlay.className = "directives-loading-overlay"; // 稍后在样式文件中定义
    overlay.style.display = "none";

    // 创建 中间旋转 的元素
    const spinner = document.createElement("div");
    spinner.className = "directives-loading-spinner"; // 稍后在样式文件中定义

    overlay.appendChild(spinner);
    el.overlay = overlay;
    el.style.position = "relative"; // 设置相对定位
    el.appendChild(overlay);

    // 根据元素的大小设置加载动画的尺寸
    const size = Math.min(Math.min(el.clientWidth, el.clientHeight) / 2, 30);
    spinner.style.width = `${size}px`;
    spinner.style.height = `${size}px`;
    spinner.style.borderWidth = `${size / 10}px`;

    if (binding.value) {
      el.overlay!.style.display = "flex";
      el.classList.add("directives-loading-active"); // 稍后在样式文件中定义
    } else {
      el.overlay!.style.display = "none";
    }
  },
  // 在绑定值更新时调用
  updated(el: LoadingType, binding: DirectiveBinding) {
    // 根据绑定值的变化显示或隐藏加载效果
    if (binding.value) {
      el.overlay!.style.display = "flex";
      el.classList.add("directives-loading-active");
    } else {
      el.overlay!.style.display = "none";
      el.classList.remove("directives-loading-active");
    }
  },
  unmounted(el: LoadingType) {
    // 移除加载元素
    el.removeChild(el.overlay!);
    el.overlay = null;
  },
};

export default vLoading;
