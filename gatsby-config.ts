/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

import { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "VikeLabs",
    titleTemplate: "%s · VikeLabs",
    description:
      "VikeLabs is the only UVic club dedicated to giving Computer Science and Software Engineering students hands on experience in ideating, building, and launching web-based software products.",
    url: "https://vikelabs.ca", // No trailing slash allowed!
    // social media
    github: "VikeLabs",
    linkedin: "vikelabs",
    discord: "https://discord.gg/AWcEfYKjff",
    instagram: "vikelabs",
    facebook: "vikelabs",
  },
  plugins: [
    // This had to be added at the top (or near the top) to make the theming work.
    "@chakra-ui/gatsby-plugin",
    // {
    //   // keep as first gatsby-source-filesystem plugin for gatsby image support
    //   resolve: "gatsby-source-filesystem",
    //   options: {
    //     path: `${__dirname}/static/img`,
    //     name: "uploads",
    //   },
    // },
    // required for gatsby-source-filesystem
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`, // Needed for dynamic images
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/content/projects`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown_pages`,
        path: `${__dirname}/content/pages`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages`,
      },
    },
    // {
    //   resolve: "gatsby-source-filesystem",
    //   options: {
    //     name: "images",
    //     path: `${__dirname}/src/img`,
    //   },
    // },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // Footnotes mode (default: true)
        footnotes: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [],
      },
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
  ],
};

export default config;
