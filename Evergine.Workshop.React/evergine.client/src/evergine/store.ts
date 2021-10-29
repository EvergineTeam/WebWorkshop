import { StoreApi, StateListener, State } from 'zustand';

const configureWindowStore = <T extends State>(
    store: StoreApi<T>,
    windowProperty: KeysOfType<typeof window, WindowStoreApi>
): void => {
    window[windowProperty!] = {
        getState: () => ({
            ...store.getState()
        }),
        subscribe: (listener: StateListener<T>) => {
            const unsubscribe = store.subscribe((state) => {
                if (state) {
                    setTimeout(() => listener({ ...state }));
                }
            });
            return unsubscribe;
        }
    };
};

export {configureWindowStore};