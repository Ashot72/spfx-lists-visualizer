import { types, IModelType } from "mobx-state-tree";
import { Entity } from './entity';

export const Connector = types.model('Connector', {
    id: types.identifier(),
    from: types.reference(Entity),
    to: types.reference(Entity)
});

export type IConnector = typeof Connector.Type;