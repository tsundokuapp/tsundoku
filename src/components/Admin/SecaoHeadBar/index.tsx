import React from 'react';
import Container from './styles';

interface ISecaoHeadBar { children?: React.ReactNode; } 

const SecaoHeadBar = ({ children }: ISecaoHeadBar) => {

    return (
        <Container>
            { children }
        </Container>
    );
}

export default SecaoHeadBar;
