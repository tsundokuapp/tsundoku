import { useState } from "react";
import { LayoutListagem } from "@/components/Layouts/Listagem";
import { AllPostsBlog as posts } from "@/constants/WorksTsun";
import { CardBlog } from "@/components/CardBlog";
import { ItemByItemAnimation } from "@/animations/ItemByItem";

export default function Novel() {
  // eslint-disable-next-line no-unused-vars
  const [temAviso, setTemAviso] = useState(true);

  return (
    <LayoutListagem
      titleWeb="Blog - Tsundoku"
      columns={3}
      titleSession="Blog"
      sloganSession="Notícias, entrevistas, rumores e muitos posts de qualidade duvidosa"
      hrefCover="https://i.imgur.com/eaHhcfP.jpeg"
      altCover="imagem de uma menina de cabelos branco sentada de costas para o observador com vários livros ao seu redor"
      filter="blog"
    >
      {posts.map((item, i) => (
        <ItemByItemAnimation key={i} order={i}>
          <CardBlog href={item.href} capa={item.cover} titulo={item.title} />
        </ItemByItemAnimation>
      ))}
    </LayoutListagem>
  );
}
