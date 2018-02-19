import * as React from 'react';
import * as strings from 'ListVisualizerWebPartStrings';
import { inject, observer } from 'mobx-react';
import { DraggableCore } from 'react-draggable';
import styles from './EntityView.module.scss';
import  ContextMenu from '../contextMenu/ContextMenu';
import { IEntityViewProps } from './IEntityViewProps';
import { IEntityViewState } from './IEntityViewState';
import { colors, X, Y } from '../../utils';

@inject("store") @observer
export default class EntityView extends React.Component<IEntityViewProps, IEntityViewState> {    
    private target: HTMLDivElement;
    
    constructor(props: IEntityViewProps) {
        super(props);
        this.state = { isCalloutVisible: false, dragged: false };
    }

    public render()  {
        const { entity, store } = this.props;
    
        return (
            <div>
                <div>
                <DraggableCore onDrag={ this.handleDrag }>
                    <div ref={ instance => {this.target = instance; } }
                        style={{
                            width: entity.width,
                            left: entity.x,
                            top: entity.y,
                            backgroundColor: entity.bgColor === null ? 'red' : entity.isSelected ? '#f99b1d' : `${ entity.bgColor }`
                        }}
                        onClick={ this.handleClick }
                        className={ styles.box }>
                        { entity.Title }
                    </div>
                </DraggableCore>
                </div> 
                <ContextMenu      
                    view = { store.view }
                    entity = { entity }             
                    target = { this.target }
                    isCalloutVisible={ this.state.isCalloutVisible }
                    onGoTo={ this.onGoTo }
                    onAdd={ this.onAddEntity }  
                    onTitleUpdate={ this.onTitleUpdate }
                    onRemove={ this.removeEntity }  
                    onDismiss={ this.onDismiss }  
                    onShowMenuClicked={ this.onShowMenuClicked } />   
            </div>
        );
    }

    private onGoTo= () => {            
        const { store, entity } = this.props;
        store.view.openEntityPageById(entity.Id);
    }

    private onAddEntity = () => {      
        const { store, entity } = this.props;     
        const bgColor = store.view.currentUrl === '#/' ? colors(100) : entity.bgColor;     
        store.createEntity(strings.UpdateTitle, bgColor, X(), Y(), entity);
    }

    private onTitleUpdate = () => {
        const { store, entity } = this.props;
        store.setSelection(entity);
    }

    private removeEntity = () => this.props.entity.remove();
    private onDismiss = () => this.setState({ isCalloutVisible: false });
    private onShowMenuClicked = () => this.setState({ isCalloutVisible: !this.state.isCalloutVisible });

    private handleClick = (e) => {                
        if (!this.state.dragged) {
            this.setState({ isCalloutVisible: !this.state.isCalloutVisible });           
        }   
        this.setState({ dragged: false }); 
    }

    private handleDrag = (e, dragInfo) => { 
        const { deltaX, deltaY } = dragInfo;
        // DraggableCore does not behave properly on chrome so we use setState: dragged
        (deltaX === 0 && deltaY === 0) 
            ? this.setState({ dragged: false })
            : this.setState({ dragged: true });
        
        this.props.entity.move(deltaX, deltaY);
    } 
}
