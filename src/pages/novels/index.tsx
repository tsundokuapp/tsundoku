import { useState } from "react";

import { ItemByItemLeftAnimation } from "@/animations/ItemByItem";
import { Card } from "@/components/Card";
import { LayoutListagem } from "@/components/Layouts/Listagem";
import { AllWorksTsun as works } from "@/constants/WorksTsun";

export default function Novel() {
  // eslint-disable-next-line no-unused-vars
  const [temAviso, setTemAviso] = useState(true);

  return (
    <LayoutListagem
      titleWeb="Novels - Tsundoku"
      titleSession="Novels"
      columns={4}
      sloganSession="Encotre sua próxima novel na estante da Tsun"
      hrefCover="https://i0.wp.com/tsundoku.com.br/wp-content/uploads/2021/01/Tsundoku-Traducoes-Ligth-Novel-Mushoku-Tensei-Volume-12-Imagem-01.jpg?resize=2000%2C1425&ssl=1"
      altCover="imagem da obra Mushoku Tensei, mostra o protagonista e sua esposa"
      filter="default"
    >
      {works.map((item, i) => (
        <ItemByItemLeftAnimation key={i} order={i}>
          <Card
            href={item.href}
            capa={item.cover}
            titulo={item.title}
            autor={item.author}
            volume={`Volume ${item.volume}`}
          />
        </ItemByItemLeftAnimation>
      ))}
    </LayoutListagem>
  );
}
