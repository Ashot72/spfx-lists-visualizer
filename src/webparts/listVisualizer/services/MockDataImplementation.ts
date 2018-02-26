import { Dialog } from '@microsoft/sp-dialog';
import { get } from '@microsoft/sp-lodash-subset';

  const countries = '/countries.json';
  const cities = '/cities.json';

  export const fetch = (entityId: string) => {
    return entityId
     ? window.fetch(cities).then(response => response.json())
     : window.fetch(countries).then(response => response.json());        
  };

  export const addEntity = ({ source, title }, { view: { currentUrl }}): Promise<string | number> => Promise.resolve(1); 
  export const updateTitle = ({ source, entity, title }, { view: { currentUrl }}): Promise<void> => Promise.resolve();
  export const removeEntity = ({ source, entity }, { view: { currentUrl }}): Promise<void> => Promise.resolve();   

  export const alert = (error: any) => {       
      const odataError: string = get(error, 'data.responseBody.["odata.error"].message.value');
      Dialog.alert(odataError || error.message || error);
  };
