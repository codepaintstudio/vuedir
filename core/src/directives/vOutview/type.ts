export type OutViewHandler = (entry: IntersectionObserverEntry) => void;

export interface OutViewOptions extends IntersectionObserverInit {
    once?: boolean;
}

export type OutViewDirectiveValue =
    | OutViewHandler
    | {
        handler: OutViewHandler;
        options?: OutViewOptions;
    };