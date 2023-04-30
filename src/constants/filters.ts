export interface IFilter {
  label: string;
  values: string[];
}

export const allFilters = [
  {
    label: "NACIONALIDADE",
    values: ["Japonesa", "Chinesa", "Coreana", "Outra"],
  },
  { label: "STATUS", values: ["Em andamento", "Completo", "Cancelado"] },
  {
    label: "TIPOS",
    values: ["Mangá", "Manhua", "Manhwa", "Light Novel", "Web Novel", "Outro"],
  },
  { label: "ORDEM", values: ["Alfabética", "Popularidade", "Lançamento"] },
  {
    label: "GENEROS",
    values: [
      "Ação",
      "Aventura",
      "Comédia",
      "Drama",
      "Fantasia",
      "Tragédia",
      "Romance",
      "Suspense",
      "Terror",
    ],
  },
  {
    label: "CATEGORIAS",
    values: ["Entrevistas", "Notícias", "Reviews", "Outros"],
  },
];

const [NACIONALIDADES, STATUS, TIPOS, ORDEM, GENEROS, CATEGORIAS] = allFilters;
export const defaultFilters = [NACIONALIDADES, STATUS, TIPOS, ORDEM, GENEROS];
export const blogFilters = [CATEGORIAS, ORDEM];
