import { v4 } from "node-uuid";
import { random } from '@microsoft/sp-lodash-subset';

// get dimensions on a modern page ?
// const canvas = document.querySelector(".Canvas"); 
const canvas = { clientWidth: 700, clientHeight: 400 };

export const X = () => random(0.05, 0.9) * canvas.clientWidth;
export const Y = () => random(0.1, 1) * canvas.clientHeight;
export const center: { x: number, y: number } = ({ x: canvas.clientWidth / 2, y: canvas.clientHeight / 2 });
export const randomUuid = () => v4();

export const colors = (key: number): string => { 
    const data = [
            { key : 100, color: "blue" },
            { key : 101, color: "green" },            
            { key : 102, color: "#e60bf9" },
            { key : 171, color: "#285f47" }
          ];

    const colorFound = data.find(dt => dt.key === key);   
    return colorFound ? colorFound.color : '#5d5958';
};

export const color = (obj, id: number): string => {    
    if(obj.colors) {       
        const bgColor = obj.colors(id);
        if (bgColor) return bgColor; 
    }   
    return '';
};
