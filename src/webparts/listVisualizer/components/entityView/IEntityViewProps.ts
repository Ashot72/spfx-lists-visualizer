import { IEntity } from '../../stores/entity';
import { IStore } from '../../stores/store';

export interface IEntityViewProps {
    entity: IEntity;
    store?: IStore;
}