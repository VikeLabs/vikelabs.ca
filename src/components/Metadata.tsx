import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import { GetMetadata } from "./__generated__/GetMetadata";

type MetadataProps = {
  description?: string;
  lang?: string;
  meta?: React.DetailedHTMLProps<
    React.MetaHTMLAttributes<HTMLMetaElement>,
    HTMLMetaElement
  >[];
  title: string;
};

export const Metadata = ({
  description,
  lang = "en",
  meta = [],
  title,
}: MetadataProps) => {
  const { site } = useStaticQuery<GetMetadata>(
    graphql`
      query GetMetadata {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  );

  const metaDescription = description || site?.siteMetadata?.description || "";
  const defaultTitle = site?.siteMetadata?.title || "";

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : defaultTitle}
      meta={[
        ...meta,
        <meta name="description" content={metaDescription} />,
        <meta property="og:title" content={title} />,
        <meta property="og:description" content={metaDescription} />,
        <meta property="og:type" content="website" />,
        <meta name="twitter:card" content="summary" />,
        <meta name="twitter:creator" content="" />,
        <meta name="twitter:title" content={title} />,
        <meta name="twitter:description" content={metaDescription} />,
      ]}
    />
  );
};
