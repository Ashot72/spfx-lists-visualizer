import { Dialog } from '@microsoft/sp-dialog';
import { get } from '@microsoft/sp-lodash-subset';

  const countries = '/countries.json';
  const cities = '/cities.json';

  export const fetch = (entityId: string) => {
    return entityId
     ? window.fetch(cities).then(response => response.json())
     : window.fetch(countries).then(response => response.json());        
  };

  export const addEntity = ({ source, title }, currentUrl: string): Promise<string | number> => {   
     return Promise.resolve(1);
  };

  export const updateTitle = ({ source, entity, title }, currentUrl: string): Promise<void> => {  
     return Promise.resolve();    
  };

  export const removeEntity = ({ source, entity }, currentUrl: string): Promise<void> => {
     return Promise.resolve();          
  };

  export const alert = (error: any) => {       
      const odataError: string = get(error, 'data.responseBody.["odata.error"].message.value');
      Dialog.alert(odataError || error.message || error);
  };
