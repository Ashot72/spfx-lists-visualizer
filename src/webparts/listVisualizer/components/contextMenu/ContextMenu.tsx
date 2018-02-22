import * as React from 'react';
import * as strings from 'ListVisualizerWebPartStrings';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { observer } from 'mobx-react';
import styles from './ContextMenu.module.scss';
import { IContextMenuProps } from './IContextMenuProps';

const ContextMenu: React.SFC<IContextMenuProps> = (props) => {

    const { isCalloutVisible, target, entity: { isSource }, view: { currentUrl } } = props;

    return(
        isCalloutVisible 
         ? <Callout                    
                target={ target }
                directionalHint= { DirectionalHint.topCenter }
                onDismiss={ props.onDismiss }>    
                <div className={ styles.header }>
                    { !isSource && currentUrl === '#/' && <div><Link onClick={ props.onGoTo }>{ strings.GoToItems }</Link></div> } 
                    { isSource && <div><Link onClick={ props.onAdd }>{ currentUrl === '#/' ? strings.AddList :  strings.AddListItem }</Link></div> }             
                    { !isSource && <div><Link onClick={ props.onTitleUpdate }>{ strings.UpdateTitle }</Link></div> }
                    { !isSource && <div><Link onClick={ props.onRemove }>{ strings.Remove }</Link></div> }
                </div>
                <div className={styles.inner}>                        
                    <PrimaryButton  onClick={ props.onShowMenuClicked } text={ strings.Close } />                        
                </div>         
            </Callout> : null 
    );   
};

export default observer(ContextMenu);