import { types, IModelType, getParent } from 'mobx-state-tree';

export const View = types.model({
    page: 'entities',
    selectedEntityId: ''
})
.views(self => ({
    get store() {
        return getParent(self);
    },
    get currentUrl() {       
        switch(self.page) {
            case 'entities':
               return '#/';
            case 'entity':
               return '#/entity/' + self.selectedEntityId;           
        }
    }
}))
.actions(self => ({
    openEntitiesPage() {        
        self.store.load();
        self.page = 'entities';
        self.selectedEntityId = '';        
    }, 
    openEntityPageById(id) {   
        self.store.load(id); 
        self.page = 'entity';
        self.selectedEntityId = id;        
    }
}));

export type IView = typeof View.Type;