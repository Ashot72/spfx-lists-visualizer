import * as React from 'react';
import * as strings from 'ListVisualizerWebPartStrings';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { debounce } from '@microsoft/sp-lodash-subset';
import { inject, observer } from 'mobx-react';
import { ISidePanelProps } from './ISidePanelProps';

@inject("store") @observer
export default class SidePanel extends React.Component<ISidePanelProps, { text: string }> {  
    
        constructor(props: ISidePanelProps) {
            super(props);            
            this.state = { text: null };
        }
    
        public componentWillReceiveProps(nextProps) {       
            this.setState({ text: null });
        }

        public render() {
            const { selection, isLoading } = this.props.store;

            return(
                selection 
                ? <Panel
                    isOpen={ selection !== null }
                    isBlocking={ false }
                    headerText={ strings.UpdateTitle }
                    isLightDismiss={ true }
                    type= { PanelType.smallFixedFar }
                    onDismiss= { this.onClosePanel }>
                    <TextField
                        underlined 
                        value={ this.state.text || selection.Title }
                        readOnly = { isLoading === true }
                        onChanged={ debounce(this.handleChange, 300) }
                    />
                    </Panel> : null
            ); 
        }

        private handleChange = text => {
            const { store } = this.props;

            if (store.selection) {
                store.updateTitle(text);
                this.setState({ text });
            }                         
        }

        private onClosePanel = () => this.props.store.setSelection(null);
}
