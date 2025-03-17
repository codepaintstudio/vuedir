import { Directive, DirectiveBinding } from 'vue';
import { ImageConversionOptions } from './type';

function getMimeType(format: string): string {
    switch (format.toLowerCase()) {
        case 'jpg':
        case 'jpeg':
            return 'image/jpeg';
        case 'png':
            return 'image/png';
        case 'webp':
            return 'image/webp';
        default:
            throw new Error(`Unsupported format: ${format}`);
    }
}

function getQuality(options: ImageConversionOptions): number {
    switch (options.compression) {
        case 'oto':
            return 1;
        case 'lts':
        case 'stl':
            return Math.min(1, Math.max(0, options.ratio));
    }
}

async function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

export async function convertImage(
    originalSrc: string,
    options: ImageConversionOptions
): Promise<string> {
    try {
        const img = await loadImage(originalSrc);
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas context not available');

        ctx.drawImage(img, 0, 0);
        return canvas.toDataURL(
            getMimeType(options.to),
            getQuality(options)
        );
    } catch (error) {
        console.error('Image conversion failed:', error);
        return originalSrc;
    }
}

function shouldUpdate(
    oldValue: ImageConversionOptions,
    newValue: ImageConversionOptions
): boolean {
    return JSON.stringify(oldValue) !== JSON.stringify(newValue);
}

export const vConversionImage: Directive = {
    mounted(el: HTMLImageElement, binding: DirectiveBinding<ImageConversionOptions>) {
        const originalSrc = el.src;
        convertImage(originalSrc, binding.value).then(newSrc => {
            el.src = newSrc;
        });
    },
    updated(el: HTMLImageElement, binding: DirectiveBinding<ImageConversionOptions>) {
        if (shouldUpdate(binding.oldValue, binding.value)) {
            const originalSrc = el.src;
            convertImage(originalSrc, binding.value).then(newSrc => {
                if (el.src !== newSrc) {
                    el.src = newSrc;
                }
            });
        }
    }
};