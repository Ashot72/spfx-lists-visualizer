import { IObservableArray } from "mobx";
import { types, IModelType, flow, getEnv, destroy, ISnapshottable, IExtendedObservableMap  } from "mobx-state-tree";
import { Entity, IEntity } from './entity';
import { Connector, IConnector } from './connector';
import { View } from './view';
import { IDataStructure } from '../services/IDataStructure';
import { randomUuid, X, Y, center, color } from "../utils";

export const Store = types.model('Store', {
    entities: types.map(Entity),
    connectors: types.array(Connector),
    selection: types.maybe(types.reference(Entity)),
    isLoading: true,
    view: types.optional(View, { })
})
.views(self => ({
    get fetch(): Promise<IDataStructure> {
        return getEnv(self).fetch;
    },
    get add(): Promise<void>  {
        return getEnv(self).add;
    },
    get update(): Promise<void> {
        return getEnv(self).update;
    },  
    get remove(): Promise<void> {
        return getEnv(self).remove;
    },
    get alert(): void {
        return getEnv(self).alert;
    },
    get colors(): string {
        return getEnv(self).colors;
    },
    get source(): IEntity {
        return self.entities.values().find(entity => entity.isSource === true);
    },
    connector(entity: IEntity): IConnector {
        return self.connectors.find(con => con.to === entity); 
    }
}))
.actions((self:any) => ({
    markLoading(loading: boolean) {
       self.isLoading = loading;
    },
    addEntity (Title: string, bgColor: string, isSource: IEntity, x: number, y: number, Id: string) {             
       Id = Id ? Id.toString() : randomUuid();

       const entity: IEntity = Entity.create({ Title, bgColor, isSource, x, y, Id });
       self.entities.put(entity);
       return entity;
    },
    addConnector (from: IEntity, to: IEntity) {
        self.connectors.push({ id: randomUuid(), from, to } as IConnector);
    },
    removeConnector (connector: IConnector) {
        self.connectors.remove(connector);
    },
    destroyEntity(entity: IEntity) {
        destroy(entity);
    },
    setSelection (selection: (IEntity | string)) {
        self.selection = selection;
    },
    clear () {
      self.entities = { };
      self.connectors = [];
      self.selection = null;
      self.isLoading = true;
      self.view = { };
    },
    load: flow(function* (entityId: string) {
        try {     
            self.clear();

            const json: IDataStructure = yield self.fetch(entityId);        
            self.markLoading(false);

             const { entities, source: { Id, Title, BaseTemplate, x, y } } = json;

             // Source
             const bgColor:string = BaseTemplate ? color(self, BaseTemplate) : null;                              
             const src:IEntity = self.addEntity(Title, bgColor, true, (x || center.x), (y || center.y), Id);

             // Entities
             entities.forEach(({ Id, Title, BaseTemplate, x, y }) => {                   
                const baseTemplate:(number | null) = BaseTemplate || json.source.BaseTemplate || null;            
                const bgColor:string = color(self, baseTemplate);

                const entity:IEntity = self.addEntity(Title, bgColor, false, (x || X()), (y || Y()), Id);
                self.addConnector(src.Id, entity.Id);               
           });
        } catch(err) {
            self.markLoading(false);
            self.alert(err);
        }
    }),
    createEntity (Title: string, bgColor: string, x: number, y: number, source:IEntity) {       
            self.markLoading(true);

            self.add({ source: self.source, title: Title }).then((id: string | number) => {                                          
                const entity:IEntity = self.addEntity(Title, bgColor, false, x, y, id);
                self.setSelection(entity);               
                self.addConnector(source.Id, entity.Id);
                self.markLoading(false);                            
            })   
            .catch((err:any) => {
                self.markLoading(false);
                self.alert(err);
            });       
    },
    updateTitle(title: string) { 
            self.markLoading(true);

            self.update({source: self.source, entity: self.selection, title }).then(() => {              
               self.selection.setTitle(title);  
               self.markLoading(false);                                
            })
            .catch((err:any) => {
                self.markLoading(false);
                self.alert(err);
            });      
    },
    removeEntityWithConnector(entity: IEntity) {      
        self.markLoading(true);

        self.remove({ source: self.source, entity }).then(() => {                                          
            self.removeConnector(self.connector(entity));
            self.destroyEntity(entity);
            self.markLoading(false);                          
        })
        .catch((err:any) => {              
            self.markLoading(false);
            self.alert(err);
        });    
     }
}));

export type IStore = typeof Store.Type;
