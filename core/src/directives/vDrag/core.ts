import { Directive } from "vue";
import { DragOptions, DragCallback } from "./type";
import { throttle } from "../../utils/tool";

const vDrag: Directive<HTMLElement, DragOptions> = {
  mounted(el, binding) {
    setupDrag(el, binding.value);
  },
  updated(el, binding) {
    setupDrag(el, binding.value);
  },
};

function setupDrag(el: HTMLElement, options?: DragOptions) {
  if (!options) {
    if (el.style.position != "absolute") {
      el.style.position = "absolute";
    }
    el.onmousedown = (e: MouseEvent) => {
      const startX = e.clientX;
      const startY = e.clientY;
      const initLeft = el.offsetLeft;
      const initTop = el.offsetTop;
      const onMouseMove = (e: MouseEvent) => {
        const left = initLeft + (e.clientX - startX);
        const top = initTop + (e.clientY - startY);
        el.style.left = `${left}px`;
        el.style.top = `${top}px`;
      };
      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };
  } else {
    const rangeElement = options.range || null;
    let { startDrag, onDrag, endDrag } = options;

    startDrag = startDrag || (() => {});
    endDrag = endDrag || (() => {});

    let dragHandler: DragCallback = () => {};
    let throttleTime: number | undefined;

    if (onDrag) {
      if (typeof onDrag === "function") {
        dragHandler = onDrag;
      } else if (typeof onDrag === "object" && "event" in onDrag) {
        dragHandler = onDrag.event;
        throttleTime = onDrag.throttle;
      }

      if (throttleTime !== undefined && typeof throttleTime === "number") {
        dragHandler = throttle(dragHandler, throttleTime);
      }
    }

    if (rangeElement) {
      if (getComputedStyle(rangeElement).position === "static") {
        rangeElement.style.position = "relative";
      }
    }

    if (getComputedStyle(el).position === "static") {
      el.style.position = "absolute";
    }

    el.onmousedown = (e: MouseEvent) => {
      const startX = e.clientX;
      const startY = e.clientY;
      const initLeft = el.offsetLeft;
      const initTop = el.offsetTop;

      startDrag({ event: e, left: initLeft, top: initTop });

      const onMouseMove = (e: MouseEvent) => {
        let left = initLeft + (e.clientX - startX);
        let top = initTop + (e.clientY - startY);

        if (rangeElement) {
          const rangeRect = rangeElement.getBoundingClientRect();
          const elRect = el.getBoundingClientRect();
          const maxX = rangeRect.width - elRect.width;
          const maxY = rangeRect.height - elRect.height;

          left = Math.max(0, Math.min(left, maxX));
          top = Math.max(0, Math.min(top, maxY));
        }

        el.style.left = `${left}px`;
        el.style.top = `${top}px`;

        dragHandler({ event: e, left, top });
      };

      const onMouseUp = (e: MouseEvent) => {
        endDrag({ event: e, left: el.offsetLeft, top: el.offsetTop });
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };
  }
}

export { vDrag };
