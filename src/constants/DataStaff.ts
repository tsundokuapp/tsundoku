// import elaina from "../assets/images/elaina.png";

const majo = "https://i.imgur.com/ReOQp5q.png";
const majo1 = "https://i.imgur.com/frj3OxJ.jpeg";
const asuna = "https://i.imgur.com/8110hSZ.jpeg";
const megumin = "https://i.imgur.com/F4bMQfK.jpeg";
const tamako = "https://i.imgur.com/BnZGm35.png";
const tamako1 = "https://i.imgur.com/hfU0jqk.png";
const akane = "https://i.imgur.com/ivpqhYs.jpeg";
const subaru = "https://i.imgur.com/8AZQDXi.png";
const toga = "https://i.imgur.com/tKRsJXh.png";
const bocchi = "https://i.imgur.com/TQqt4D0.png";
const yor = "https://i.imgur.com/Rzf05dA.jpeg";
const yamada = "https://i.imgur.com/Y1Suxav.jpeg";
const purple = "https://i.imgur.com/D6x5ljG.png";
const wenry = "https://i.imgur.com/vLZeRl1.jpeg";
const killLaKill = "https://i.imgur.com/NQuqfmy.jpeg";
const anya = "https://i.imgur.com/bbHtATe.jpeg";
const chunLi = "https://i.imgur.com/41mFT9m.jpeg";

interface IPinProps {
  size: "small" | "medium" | "large" | string;
  image: string;
  description?: string;
  id: number;
  position: string;
  member: string;
  favorites: string;
  bio: string;
}

const images = [
  majo,
  majo1,
  asuna,
  megumin,
  tamako,
  tamako1,
  akane,
  subaru,
  toga,
  bocchi,
  yor,
  yamada,
  purple,
  wenry,
  killLaKill,
  anya,
  chunLi,
];

const positions = [
  "Editor",
  "Tradutor",
  "Revisor",
  "Diagramador",
  "Moderador",
  "Chefe",
  "Programador",
];

const members = [
  "Axios",
  "Bravo",
  "Roel",
  "Sky",
  "Daruma",
  "Nero",
  "Plon",
  "Marface",
  "Marloon5",
  "Felsen",
  "Sin",
  "Sincronize",
  "Worst",
  "Vinicius",
  "Dionedos",
  "Gtc",
  "Bruno.",
  "Alex Fabiano",
];

const favorites = [
  "Akame ga Kill",
  "Mushoku tensei",
  "Kaguya-sama",
  "Hinowa",
  "K-on",
  "Kimetsu",
  "Re:zero",
  "One Punch Man",
  "Goblin Slayer",
  "Boku no Hero",
  "Solo Leveling",
  "Tensei Shitara Slime",
  "Tate no Yuusha",
  "Kumo Desu ga, Nani ka?",
  "Kuma Kuma Bear",
  "One Piece",
  "Majo no Tabitabi",
  "Monogatari Series",
  "Charlotte",
  "Tengoku Daimakyou",
  "Hyouka",
];

const bios = ["Uma pessoa legal", "Uma pessoa legal", "Uma pessoa legal"];

const size = ["small", "medium", "large"];

function getRandomItem(arr: string[]) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function getRandomId() {
  return Math.floor(Math.random() * 9000);
}
function DataStaff() {
  const data: IPinProps = {
    id: getRandomId(),
    image: getRandomItem(images),
    position: getRandomItem(positions),
    member: getRandomItem(members),
    favorites: getRandomItem(favorites),
    bio: getRandomItem(bios),
    size: getRandomItem(size),
  };

  return data;
}

export const DataStaffs = (quantity: number) => {
  const data = [];
  for (let i = 0; i < quantity; i++) {
    data.push(DataStaff());
  }
  return data;
};
