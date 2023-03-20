import React from 'react';
import { PropsWithChildren } from 'react';
import Container from './styles';

interface INavPaginas {   children?: React.ReactNode; ajuste?: boolean} 

const NavPaginas: React.FC<PropsWithChildren<INavPaginas>> = ({children, ajuste}) =>{
    return <Container ajuste={ajuste}>
        {children}
    </Container>    
}

export default NavPaginas;

