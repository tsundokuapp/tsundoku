import { LayoutMain } from '../components/Layouts/Main';
// import { Roboto } from 'next/font/google';

// TODO: discutir se usaremos. Essa feature é experimental!
// const roboto = Roboto({ subsets: ['latin'], weight: "400", style: "normal" })
// exemplo: <html classname={roboto.className}>

export default function Home() {
  return (
    <LayoutMain title="Tsundoku Traduções">
      <h1> -- TSUN V2 -- </h1>
    </LayoutMain>
  );
}
