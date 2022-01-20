import React from 'react';
import Container from 'components/SecaoHeadBar/styles';

const SecaoHeadBar: React.FC = ({ children }) => {

    return (
        <Container>
            { children }
        </Container>
    );
}

export default SecaoHeadBar;