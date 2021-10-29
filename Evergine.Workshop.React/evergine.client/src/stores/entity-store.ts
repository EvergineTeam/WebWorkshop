import create from 'zustand';
import { configureWindowStore } from '@evergine/store';

export type EntityInfo = {
    color: string;
    scaleFactor: number | number[];
    entityName: string;
}

export type EntityStore = {
    entity?: EntityInfo,
    setEntityInfo: (value?: EntityInfo) => void;
}

const useStore = create<EntityStore>((set) => ({
    entity: undefined,
    setEntityInfo: (entityInfo?: EntityInfo) =>
        set(() => ({
            entity: entityInfo
        }))
}));

configureWindowStore(useStore, 'entityStore');

export { useStore as entityStore };
