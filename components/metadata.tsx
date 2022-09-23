import Head from "next/head";

type MetadataProps = {
  title: string;
  description?: string;
  image?: string;
};

export const Metadata = ({ title, description, image }: MetadataProps) => {
  const defaultDescription =
    "We are a community of student developers, designers, and entrepreneurs who are passionate about building the future of the software. Based at the University of Victoria, we are a student-run software development club.";
  const defaultImage = "/vikelabs.jpg";

  return (
    <Head>
      <title>{title} | VikeLabs</title>
      <meta name="description" content={description ?? defaultDescription} />
      {/* TODO */}
      <meta name="image" content={image ?? defaultImage} />
      {/* Open Graph */}
      <meta property="og:url" content="https://vikelabs.ca" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="VikeLabs" />
      <meta
        property="og:description"
        content={description ?? defaultDescription}
      />
    </Head>
  );
};
