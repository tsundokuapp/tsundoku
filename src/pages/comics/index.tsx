import { useState } from "react";
import { LayoutListagem } from "@/components/Layouts/Listagem";
import { ItemByItemAnimation } from "@/animations/ItemByItem";
import { Card } from "@/components/Card";
import { AllWorksTsun as works } from "@/constants/WorksTsun";

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
      {works.map((item, i) => (
        <ItemByItemAnimation key={i} order={i}>
          <Card
            href={item.href}
            capa={item.cover}
            titulo={item.title}
            autor={item.author}
            volume={`Volume ${item.volume}`}
          />
        </ItemByItemAnimation>
      ))}
    </LayoutListagem>
  );
}
