import * as React from 'react';
import * as strings from 'ListVisualizerWebPartStrings';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { inject, observer } from 'mobx-react';
import styles from './App.module.scss';
import EntityView from '../entityView/EntityView';
import ConnectorView from '../connectorView/ConnectorView';
import  SidePanel from '../sidePanel/SidePanel';
import { IConnector } from '../../stores/connector';
import { IEntity } from '../../stores/entity';
import { IAppProps } from './IAppProps';
import SVG from '../svg/SVG';

const App: React.SFC<IAppProps> = ({ store }) => {
 
    const onCanvasClick = () =>{
        if (!store.isLoading) {
           store.setSelection(null);
        }
    }; 

    const renderPage = () => {
        const { view: { page }, connectors, entities } = store;

        switch(page) {
            case 'entities':
            case 'entity':                   
               return (
                   <div className={ styles.canvas } onClick={ onCanvasClick }>
                    <svg>
                        { connectors.map((connector: IConnector) => <ConnectorView connector={ connector } key={ connector.id.toString() } />) } 
                    </svg>
                    { entities.values().map((entity:IEntity) => <EntityView entity={entity} key={ entity.Id.toString() } />) }                 
               </div>
               );           
        }
    };

    return(
        <div className={styles.container }>
            <SVG />    
            { store.isLoading && <Spinner size={ SpinnerSize.large } label={ strings.Wait } /> }    
            <div className={ styles.app }>                  
                { renderPage() }             
                <SidePanel />             
            </div>
        </div>
      );
};

export default inject('store')(observer(App));
