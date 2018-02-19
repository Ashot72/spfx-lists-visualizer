import { IEntity } from '../../stores/entity';
import { IView } from '../../stores/view';

export interface IContextMenuProps {
    isCalloutVisible: boolean;
    target: HTMLDivElement;
    entity: IEntity;
    view: IView;
    onGoTo: () => void;
    onAdd: () => void;
    onTitleUpdate: () => void;
    onRemove: () => void;
    onDismiss: () => void;
    onShowMenuClicked: () => void;
}