import * as React from 'react';
import styles from './SVG.module.scss';

const SVG: React.SFC = () =>            
        <svg height="0">
            <defs>
                <marker id="markerArrow" 
                  className={ styles.markerArrow } 
                  markerWidth="10" 
                  markerHeight="10"
                  refX="50" 
                  refY="5" 
                  orient="auto">
                    <path d="M0,0 L0,10 L10,5 z" />
                </marker>
            </defs>
        </svg>;    

export default SVG;