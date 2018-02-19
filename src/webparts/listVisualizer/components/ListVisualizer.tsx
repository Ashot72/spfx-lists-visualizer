import * as React from 'react';
import { reaction } from 'mobx';
import { Provider } from 'mobx-react';
import { IListVisualizerProps } from './IListVisualizerProps';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { Store } from '../stores/store';
import App from './app/App';
import createRouter from '../router';
import { colors } from '../utils';

const l = Environment.type === EnvironmentType.Local 
   ? require("../services/MockDataImplementation") 
   : require("../services/ListImplementation"); 

const ListVisualizer: React.SFC<IListVisualizerProps> = () => {
 
    const store = Store.create({
        entities : { },
        connectors: [],
        selection: null
    },
    {
        fetch: l.fetch,
        alert: l.alert, 
        colors,
        update: data => l.updateTitle(data, store.view.currentUrl),
        add: data => l.addEntity(data, store.view.currentUrl),
        remove: data => l.removeEntity(data, store.view.currentUrl)
    });

    reaction(
      () => store.view.currentUrl,
      path => {             
          if (window.location.hash !== path) window.history.pushState(null, null, path);
      }
    );

    const router = createRouter({
      '#/entity/:entityId' : ({ entityId }) => store.view.openEntityPageById(entityId),
      '#/': store.view.openEntitiesPage
    });

     window.onpopstate = ev => {  
       if (ev.type === 'popstate') router(window.location.hash);
     };

     router(window.location.hash);
  
     (window as any).store = store;

     return (
       <Provider store={ store }>
          <App />
       </Provider> 
     ); 
};

export default ListVisualizer;