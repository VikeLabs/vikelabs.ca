import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl: url
      }
    }
  }
`;

type MetadataProps = {
  title: string;
};

export const Metadata = ({ title }: MetadataProps) => {
  const { site } = useStaticQuery(query);

  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
  } = site.siteMetadata;

  //   const seo = {
  //     title: title || defaultTitle,
  //     description: description || defaultDescription,
  //     image: `${siteUrl}${image || defaultImage}`,
  //     url: `${siteUrl}${pathname}`,
  //   };

  return (
    <Helmet title={title} titleTemplate={titleTemplate}>
      <meta name="description" content="A simple todo app" />
      <meta name="image" content="" />
    </Helmet>
  );
};
