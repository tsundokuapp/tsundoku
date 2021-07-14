import styled from "styled-components";

/** 
* Layout 
* MH = Main Header
* AS = Aside
* CT = Content
*/

interface IGrid{
    menu: boolean; 
}

export const Grid = styled.div<IGrid>`
    display: grid;
    grid-template-columns: 220px auto;    
    grid-template-rows: 75px auto;        
    //grid-template-areas: 'AS MH AS CT';
    
    ${(props) => props.menu ? `
    
    grid-template-areas: 
    'AS MH'
    'AS CT';
    
    ` :
    `
    grid-template-areas: 
    'MH MH'
    'CT CT';
    `
    };
    
    height: 100vh; 

    
`;
