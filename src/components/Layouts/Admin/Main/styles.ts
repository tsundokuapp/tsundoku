import styled from "styled-components";

/** 
* Layout 
* MH = Main Header
* AS = Aside
* CT = Content
*/

/*

 display: grid;
    grid-template-columns: 220px auto;    
    grid-template-rows: 75px auto;   
    height: 100vh; 
    
    grid-template-areas: 
    'AS MH'
    'AS CT';

*/

interface IGrid {
    menu: boolean;
}

const Grid = styled.div<IGrid>`

    &.wrapper{
        display: flex;
    }
    
    .coluna-grid-main {        
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    @media (max-width: 474px) {
        .coluna-grid{            
            display: none;
        }

        ${(props) => !props.menu 
        ? 
            `.coluna-grid{            
                display: block;
            }` 
        : 
            `.coluna-grid{            
                display: none;
            }` 
        }
    }
`;

export default Grid;