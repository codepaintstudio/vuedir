import type { Directive, DirectiveBinding } from 'vue'
import type { SkeletonOptions, BlockConfig, SkeletonElement } from './type'

const createSkeletonBlocks = (blocks: BlockConfig[] = [], highlightColor: string): HTMLDivElement[] => {
  return blocks.map(block => {
    const blockEl = document.createElement('div');
    blockEl.className = 'skeleton-block';
    Object.assign(blockEl.style, {
      position: 'absolute',
      width: typeof block.width === 'number' ? `${block.width}px` : block.width,
      height: typeof block.height === 'number' ? `${block.height}px` : block.height,
      top: typeof block.top === 'number' ? `${block.top}px` : block.top || '0',
      left: typeof block.left === 'number' ? `${block.left}px` : block.left || '0',
      backgroundColor: highlightColor,
    });
    return blockEl;
  });
};

const getOptions = (value: boolean | SkeletonOptions): SkeletonOptions => {
  return typeof value === 'boolean'
    ? { isLoading: value }
    : value;
};

export const vSkeleton: Directive = {
  mounted(el: SkeletonElement, binding: DirectiveBinding) {
    const options = getOptions(binding.value);
    const {
      isLoading,
      blocks = [],
      animation = 'wave',
      bgColor = '#f0f0f0',
      highlightColor = '#e0e0e0'
    } = options;

    if (getComputedStyle(el).position === 'static') {
      el.style.position = 'relative';
    }

    const skeleton = document.createElement('div');
    skeleton.className = `skeleton-container skeleton-animation-${animation}`;
    Object.assign(skeleton.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: bgColor,
      display: isLoading ? 'block' : 'none',
      overflow: 'hidden',
    });

    const blocksContainer = document.createElement('div');
    blocksContainer.append(...createSkeletonBlocks(blocks, highlightColor));
    skeleton.appendChild(blocksContainer);
    el.appendChild(skeleton);

    el._skeleton = skeleton;
  },

  updated(el: SkeletonElement, binding: DirectiveBinding) {
    const oldOptions = getOptions(binding.oldValue);
    const newOptions = getOptions(binding.value);

    if (newOptions.isLoading !== oldOptions.isLoading) {
      el._skeleton!.style.display = newOptions.isLoading ? 'block' : 'none';
    }
  },

  unmounted(el: SkeletonElement) {
    el._skeleton?.remove();
    delete el._skeleton;
  }
}