import { sp, ListAddResult, ItemAddResult } from '@pnp/sp';
import { IData } from './IData';
import { IDataStructure } from "./IDataStructure";

export default class ListsService {

    public static getLists() : Promise<IDataStructure> {

        let web, lists;      
        let batch = sp.web.createBatch();       

        sp.web.inBatch(batch).select("Id", "Title").get().then(r => web = r);        
        sp.web.lists.select("Id", "Title", "BaseTemplate")
                                                    .filter("Hidden eq false and IsCatalog eq false").inBatch(batch).get()
                                                    .then(r => lists = r);

        return batch.execute().then(() => { 
            return { source: web, entities: lists };
        });       
    }

    public static getListItems(id: string) : Promise<IDataStructure> {
        let batch = sp.web.createBatch();
        let list, listItems;

        sp.web.lists.getById(id).select("Id", "Title", "BaseTemplate").inBatch(batch).get().then(r => list = r); ;
        sp.web.lists.getById(id).items.select("Id", "Title").filter("Title ne null").inBatch(batch).get().then(r => listItems = r); ;

        return batch.execute().then(() => { 
            return { source: list, entities: listItems };
        });             
    }

    public static updateListTitle(title: string, newTitle: string): Promise<void> {        
        return sp.web.lists.getByTitle(title).update({ Title: newTitle }).then(_ => { });
    }

    public static updateListItemTitle(title: string, id: number, newTitle: string): Promise<void> {        
        return sp.web.lists.getByTitle(title).items.getById(id).update({ Title: newTitle }).then(_ => { });
    }

    public static addList(title: string): Promise<string> {
        return sp.web.lists.add(title, title, 100).then((res: ListAddResult) => res.data.Id);
    }

    public static addListItem(title: string, newTitle: string): Promise<number> {
        return sp.web.lists.getByTitle(title).items.add({ Title: newTitle }).then((res: ItemAddResult) => res.data.Id);
    }

    public static removeList(title: string): Promise<void> {
        return sp.web.lists.getByTitle(title).delete();
    }

    public static removeListItem(title: string, id: number): Promise<void> {        
        return sp.web.lists.getByTitle(title).items.getById(id).delete();
    }
}