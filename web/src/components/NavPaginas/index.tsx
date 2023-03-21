import React from 'react';
import Container from './styles';

interface INavPaginas {   children?: React.ReactNode; ajuste?: boolean} 

const NavPaginas = ({children, ajuste}: INavPaginas) =>{
    return <Container ajuste={ajuste}>
        {children}
    </Container>    
}

export default NavPaginas;

