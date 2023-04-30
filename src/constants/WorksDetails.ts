export interface IWorksTsun {
  cover: string;
  hrefCover: string;
  altCover: string;
  titleWork: string;
  titleWorkAlternative: string[];
  genres: string[];
  author: string;
  illustrator: string;
  status: string;
  type: string;
  synopsis: string;
  href: string;
  id: string;
}

export const AllMangas = [
  {
    id: "hinowa-ga-yuku",
    href: "comics/hinowa-ga-yuku",
    hrefCover:
      "https://i2.wp.com/tsundoku.com.br/wp-content/uploads/2021/12/hinowa_v8-1.jpg",
    altCover: "alguma coisa descritiva",
    titleWork: "Hinowa ga Yuku!",
    titleWorkAlternative: ["Hinowa ga Yuku!", "Hinowa ga CRUSH!"],
    genres: ["Ação", "Aventura", "Fantasia", "Shounen"],
    author: "Takahiro",
    illustrator: "Strelka",
    status: "Concluído",
    type: "Mangá",
    synopsis:
      "Hinowa é uma garota que vive em um mundo onde a guerra é constante. Ela é a líder de um grupo de soldados que lutam contra o Império de Sui. Hinowa e seus companheiros lutam para sobreviver em um mundo de guerra.",
  },
  {
    id: "rin",
    href: "comics/rin",
    hrefCover:
      "https://i2.wp.com/tsundoku.com.br/wp-content/uploads/2021/12/Capa-1.png",
    altCover: "alguma coisa descritiva",
    titleWork: "Rin-chan wa Suezen Shitai",
    titleWorkAlternative: [
      "りんちゃんは据え膳したい",
      "Rin Wants to Flirt",
      "Rin Quer Namorar",
    ],
    genres: ["Comédia", "Romance", "Vida Escolar"],
    author: "Sumida Yuki",
    illustrator: "Sumida Yuki",
    type: "Mangá",
    status: "Em andamento",
    synopsis:
      "Kobayashi é um professor de artes do ensino médio com 30 anos de idade, e Rin-chan é uma bela e popular garota na escola. Esses dois não deviam ter nada em comum, mas na realidade compartilham um segredo em comum. Uma comédia romântica relutante entre um homem de meia-idade e uma colegial ingenuamente ansiosa!",
  },
];

const [hinowa, rin] = AllMangas;
export const defaultMangas = [hinowa, rin];
