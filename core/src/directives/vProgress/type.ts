export interface ProgressOptions {
    percent: number;
    radius?: number;
    strokeWidth?: number;
    color?: string;
    showText?: boolean;
}

export type ProgressType = 'circle' | 'bar';

export interface ProgressData {
    type: ProgressType;
    svg?: SVGElement;
    foreground?: SVGElement | HTMLElement;
    text?: HTMLElement | SVGElement;
    options: ProgressOptions;
}

declare global {
    interface HTMLElement {
        _progress?: {
            type: ProgressType;
            svg?: SVGElement;
            foreground?: SVGElement | HTMLElement;
            text?: SVGElement | HTMLElement;
            options: ProgressOptions;
        }
    }
}
