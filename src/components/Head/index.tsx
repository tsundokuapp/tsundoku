import Head from "next/head";

interface IHeadProps {
  title: string;
}

export const HeadTsun = ({ title }: IHeadProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="Site de traduções de Light Novels e mangás"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
