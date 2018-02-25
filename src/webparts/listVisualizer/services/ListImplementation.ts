import { Dialog } from '@microsoft/sp-dialog';
import { get } from '@microsoft/sp-lodash-subset';
import ListsService from './ListsService';
import { IDataStructure } from '../services/IDataStructure';
import { IStore } from '../stores/store';

    export const fetch = (entityId: string): Promise<IDataStructure> => {
      return entityId
       ? ListsService.getListItems(entityId)
       : ListsService.getLists();        
    };

    export const addEntity = ({ source, title }, { view: { currentUrl }}): Promise<string | number> => {   
      return currentUrl === '#/' 
        ? ListsService.addList(title) 
        : ListsService.addListItem(source.Title, title);    
    };

    export const updateTitle = ({ source, entity, title }, { view: { currentUrl }}): Promise<void> => {    
      return currentUrl === '#/'
        ? ListsService.updateListTitle(entity.Title, title)
        : ListsService.updateListItemTitle(source.Title, +entity.Id, title);    
    };

    export const removeEntity = ({ source, entity }, { view: { currentUrl }}): Promise<void> => {
       return currentUrl === '#/' 
         ? ListsService.removeList(entity.Title) 
         : ListsService.removeListItem(source.Title, +entity.Id);           
    };

    export const alert = (error: any) => {       
        const odataError: string = get(error, 'data.responseBody.["odata.error"].message.value');
        Dialog.alert(odataError || error.message || error);
    };