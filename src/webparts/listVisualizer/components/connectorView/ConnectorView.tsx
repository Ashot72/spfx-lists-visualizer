import * as React from 'react';
import { observer } from 'mobx-react';
import { IConnectorViewProps } from './IConnectorViewProps';

const ConnectorView: React.SFC<IConnectorViewProps> = ({ connector }) => {
    const { from, to } = connector;
    if (!from || !to) return null;
    const [x1, y1, x2, y2] = [from.x + from.width / 2, from.y + 20, to.x + to.width / 2, to.y + 20];
    return <path className='arrow' d={`M${x1} ${y1} L${x2} ${y2}`} />;
};

export default observer(ConnectorView);