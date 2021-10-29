declare global {
    type WindowStoreApi<T = {}> = {
        getState: () => T;
        subscribe: (listener: StateListener<T>) => () => void;
    };

    interface Window {
        App: {};
        Module: {
            locateFile: (base: string) => string;
            canvas?: HTMLCanvasElement;
        };
        BINDING: {
            call_static_method: (method: string, args?: unknown[]) => unknown;
        };
        evergineStore: WindowStoreApi;
        entityStore: WindowStoreApi;
        areAllAssetsLoaded: () => bool;
    }
}

export {};