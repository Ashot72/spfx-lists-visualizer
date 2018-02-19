import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as strings from 'ListVisualizerWebPartStrings';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, PropertyPaneTextField} from '@microsoft/sp-webpart-base';
import { sp } from '@pnp/sp';
import ListVisualizer from './components/ListVisualizer';
import { IListVisualizerProps } from './components/IListVisualizerProps';

export interface IListVisualizerWebPartProps {
  description: string;
}

export default class ListVisualizerWebPart extends BaseClientSideWebPart<IListVisualizerWebPartProps> {

  public onInit(): Promise<void> {    
      return super.onInit().then(_ => {    
        sp.setup({
          spfxContext: this.context
        });        
      });
    }

  public render(): void {
    const element: React.ReactElement<IListVisualizerProps > = React.createElement(
      ListVisualizer,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
