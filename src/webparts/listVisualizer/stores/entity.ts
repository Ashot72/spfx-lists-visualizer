import { types, IModelType, hasParent, getParent } from "mobx-state-tree";

export const Entity = types.model('Entity', {
    Id: types.identifier(),
    Title: types.string,
    bgColor: types.maybe(types.optional(types.string, '')),
    isSource: false,
    x: 0,
    y: 0
})
.views(self => ({
    get width () {
       return  self.Title.length * 9;
    },
    get isSelected () {
       if (!hasParent(self)) return false;
       return getParent(self, 2).selection === self;
    },    
}))
.actions(self => ({
    move (dx, dy) {
        self.x += dx;
        self.y += dy;
    },
    setTitle (newTitle) {
        self.Title = newTitle;
    },
    remove() {
        getParent(self, 2).removeEntityWithConnector(self);
    }
}));

export type IEntity = typeof Entity.Type;