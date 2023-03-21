import React from 'react';
import { Container, ImagemAvatar } from './styles';

import avatar from '../../../public/assets/img/Ichigo_Ulquiorra.jpg';

const Avatar = () =>{

    return (
        <Container>
           <ImagemAvatar src={avatar}/>
            <p>Bravo</p>
        </Container>        
    );
}

export default Avatar;
