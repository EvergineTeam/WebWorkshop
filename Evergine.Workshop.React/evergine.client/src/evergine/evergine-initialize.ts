import { useEvergineStore } from '@stores/evergine-store'
import { EntityInfo, entityStore } from '@stores/entity-store';


export type EvergineMessage = {
    type: string;
    payload: object;
}

const initializeEvergine = () => {
    
     const interval = setInterval(() => {
        if(window.areAllAssetsLoaded()){
            useEvergineStore.getState().setWebAssemblyLoaded(true);
            clearInterval(interval);
            window.Module['locateFile'] = (base: string) =>
            `${process.env.PUBLIC_URL}/evergine/${base}`;
        }
    }, 500);

    window.App = {
        onEntitySelected: (message: string) => {
            const evergineMessage = JSON.parse(message) as EvergineMessage;
            entityStore.getState().setEntityInfo(evergineMessage.payload as EntityInfo);
        }
    };
};

export { initializeEvergine };
