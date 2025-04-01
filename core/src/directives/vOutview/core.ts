import { DirectiveBinding, ObjectDirective } from 'vue';
import { OutViewOptions, OutViewDirectiveValue, OutViewHandler } from './type';

const OBSERVER_MAP = new WeakMap<HTMLElement, IntersectionObserver>();

function parseValue(value: OutViewDirectiveValue): {
    handler: OutViewHandler;
    options?: OutViewOptions;
} {
    return typeof value === 'function'
        ? { handler: value }
        : value;
}

function createObserver(
    el: HTMLElement,
    binding: DirectiveBinding<OutViewDirectiveValue>
) {
    const { handler, options } = parseValue(binding.value);
    const { once = false, ...observerOptions } = options || {};

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                handler(entry);
                if (once) {
                    observer.unobserve(el);
                    OBSERVER_MAP.delete(el);
                }
            }
        });
    }, observerOptions);

    OBSERVER_MAP.set(el, observer);
    observer.observe(el);
}

function destroyObserver(el: HTMLElement) {
    const observer = OBSERVER_MAP.get(el);
    if (observer) {
        observer.disconnect();
        OBSERVER_MAP.delete(el);
    }
}

export const vOutView: ObjectDirective<HTMLElement, OutViewDirectiveValue> = {
    mounted(el, binding) {
        createObserver(el, binding);
    },

    updated(el, binding) {
        if (binding.value === binding.oldValue) return;
        destroyObserver(el);
        createObserver(el, binding);
    },

    unmounted(el) {
        destroyObserver(el);
    },
};