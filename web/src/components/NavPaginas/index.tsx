import React from 'react';
import { PropsWithChildren } from 'react';
import Container from './styles';

interface INavPaginas {   children?: React.ReactNode; } 

const NavPaginas: React.FC<PropsWithChildren<INavPaginas>> = ({children}) =>{
    return <Container>
        {children}
    </Container>    
}

export default NavPaginas;

