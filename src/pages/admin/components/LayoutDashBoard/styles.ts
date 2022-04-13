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

const Grid = styled.div<IGrid>`
    display: grid;
    grid-template-columns: 220px auto;    
    grid-template-rows: 75px auto;   
    height: 100vh; 
    
    ${(props) => props.menu ? `
    
    grid-template-areas: 
    'AS MH'
    'AS CT';` :
    
    `grid-template-areas: 
    'MH MH'
    'CT CT';
    `
    };
`;

export default Grid;