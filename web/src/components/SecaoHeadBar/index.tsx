import React from 'react';
import Container from 'components/SecaoHeadBar/styles';
import { PropsWithChildren } from 'react';

interface ISecaoHeadBar {   children?: React.ReactNode; } 

const SecaoHeadBar: React.FC<PropsWithChildren<ISecaoHeadBar>> = ({ children }) => {

    return (
        <Container>
            { children }
        </Container>
    );
}

export default SecaoHeadBar;
