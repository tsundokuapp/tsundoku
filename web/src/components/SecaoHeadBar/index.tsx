import React from 'react';
import Container from 'components/SecaoHeadBar/styles';

interface ISecaoHeadBar { children?: React.ReactNode; } 

const SecaoHeadBar = ({ children }: ISecaoHeadBar) => {

    return (
        <Container>
            { children }
        </Container>
    );
}

export default SecaoHeadBar;
