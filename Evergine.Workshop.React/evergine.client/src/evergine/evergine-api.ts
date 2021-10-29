import { EntityInfo } from '@stores/entity-store';
import {invoke} from '@evergine/evergine-definitions';


const changeObjectProperties = (entityInfo: EntityInfo) =>{
    invoke('ChangeObjectProperties', JSON.stringify(entityInfo));
};

export {
    changeObjectProperties
}