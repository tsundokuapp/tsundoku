import { LayoutMain } from '../components/Layouts/Main';
import { Carousel } from '../components/Carousel';
import { Box, BoxAviso } from '@/styles/Home/styles';
import { useState } from 'react';

export default function Home() {
  const [ temAviso, setTemAviso ] = useState(true);

  return (
    <LayoutMain title="Tsundoku Traduções">
      <Box>
        <Carousel />
        { temAviso &&
          <BoxAviso>
            <h2>AVISO</h2>
            <p>Site em construção, em breve uma nova Tsundoku!</p>
          </BoxAviso>
        } 
      </Box>
      <h1> -- TSUN V2 -- </h1>
    </LayoutMain>
  );
}
