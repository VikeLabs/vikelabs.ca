import Head from "next/head";

type MetadataProps = {
  title: string;
};

export const Metadata = ({ title }: MetadataProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="A simple todo app" />
      <meta name="image" content="" />
    </Head>
  );
};
