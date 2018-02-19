import * as route from "path-match";

const createRouter = routes => {  
    const matches = Object.keys(routes).map(path => [route()(path), routes[path]]);
    return path => 
        matches.some(([matcher, f]) => {
         let result = matcher(path);         
         if (result === false) {
             result = matcher('#/');
             if (result === false) return false;
         }        
         f(result);
         return true;
       });    
};

export default createRouter;