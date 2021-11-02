import React from 'react';
import { Container, ImagemAvatar } from './styles';

import avatar from "assets/img/Ichigo_Ulquiorra.jpg";

const Avatar: React.FC = () =>{

    return (
        <Container>
           <ImagemAvatar src={avatar}/>
            <p>Bravo</p>
        </Container>        
    );
}

export default Avatar;