import { Dialog } from '@microsoft/sp-dialog';
import { get } from '@microsoft/sp-lodash-subset';
import ListsService from './ListsService';
import { IDataStructure } from '../services/IDataStructure';

    export const fetch = (entityId: string) => {
      return entityId
       ? ListsService.getListItems(entityId).then((data: IDataStructure) => data)
       : ListsService.getLists().then((data: IDataStructure) => data);        
    };

    export const addEntity = ({ source, title }, currentUrl: string): Promise<string | number> => {   
      return currentUrl === '#/' 
        ? ListsService.addList(title) 
        : ListsService.addListItem(source.Title, title);    
    };

    export const updateTitle = ({ source, entity, title }, currentUrl: string): Promise<void> => {  
      return currentUrl === '#/'
        ? ListsService.updateListTitle(entity.Title, title)
        : ListsService.updateListItemTitle(source.Title, +entity.Id, title);    
    };

    export const removeEntity = ({ source, entity }, currentUrl: string): Promise<void> => {
       return currentUrl === '#/' 
         ? ListsService.removeList(entity.Title) 
         : ListsService.removeListItem(source.Title, +entity.Id);           
    };

    export const alert = (error: any) => {       
        const odataError: string = get(error, 'data.responseBody.["odata.error"].message.value');
        Dialog.alert(odataError || error.message || error);
    };