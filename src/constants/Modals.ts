export interface Modals {
  title: string;
  content: string;
  subtitle: string;
  id: string;
}

export const allModals = [
  {
    title: "teste",
    content:
      "https://i0.wp.com/tsundoku.com.br/wp-content/uploads/2021/01/Tsundoku-Traducoes-Light-Novel-Majo-no-Tabitabi-Volume-04-Imagem-03_-scaled.jpg?resize=2560%2C1821&ssl=1",
    subtitle: "teste subtitle",
    id: "1",
  },
  {
    title: "teste 2",
    content:
      "https://i0.wp.com/tsundoku.com.br/wp-content/uploads/2021/01/Tsundoku-Traducoes-Light-Novel-Majo-no-Tabitabi-Volume-04-Imagem-03_-scaled.jpg?resize=2560%2C1821&ssl=1",
    subtitle: "teste subtitle 2",
    id: "2",
  },
];

const [teste, teste2] = allModals;
export const defaultModals = [teste, teste2];
