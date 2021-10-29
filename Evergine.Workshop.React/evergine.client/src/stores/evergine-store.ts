import create from 'zustand';
import { configureWindowStore } from '@evergine/store';

export type EvergineState = {
    isEvergineLoaded: boolean;
    isWebAssemblyLoaded: boolean;
    setEvergineLoaded: (loaded: boolean) => void;
    setWebAssemblyLoaded: (loaded: boolean) => void;
};

const useStore = create<EvergineState>((set) => ({
    isEvergineLoaded: false,
    isWebAssemblyLoaded: false,
    setEvergineLoaded: (value) =>
        set(() => {
            return { isEvergineLoaded: value };
        }),
    setWebAssemblyLoaded: (value) => set(() => ({ isWebAssemblyLoaded: value }))
}));

configureWindowStore(useStore, 'evergineStore');

export { useStore as useEvergineStore };