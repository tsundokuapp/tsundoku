import { useState } from "react";
import { LayoutListagem } from "@/components/Layouts/Listagem";
import { ItemByItemLeftAnimation } from "@/animations/ItemByItem";
import { Card } from "@/components/Card";
import { AllMangas as mangas } from "@/constants/WorksDetails";
export default function Novel() {
  // eslint-disable-next-line no-unused-vars
  const [temAviso, setTemAviso] = useState(true);

  return (
    <LayoutListagem
      titleWeb="Comics - Tsundoku"
      columns={4}
      titleSession="Comics"
      sloganSession="Leia as melhores comics"
      hrefCover="https://i.imgur.com/HKw0BXn.jpeg"
      altCover="imagem da obra A Eminencia nas Sombras, mostra todas as personagens que seguem o protagonista"
      filter="default"
    >
      {mangas.map((item, i) => (
        <ItemByItemLeftAnimation key={i} order={i}>
          <Card
            href={item.href}
            capa={item.hrefCover}
            titulo={item.titleWork}
            autor={item.author}
            volume={`Volume 1`}
          />
        </ItemByItemLeftAnimation>
      ))}
    </LayoutListagem>
  );
}
