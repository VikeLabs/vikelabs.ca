import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import "./blog-styling.css"
import { HeadingContainer, PageHeader, EntireWrapper, Explanation } from "./blog-styling"
import { LiteYoutubeEmbed } from 'react-lite-yt-embed'; // incase it's needed
import ReactTooltip from 'react-tooltip';

// for react-lite-yt-embed
// const extractVideoURL = (demo) => {
//   return demo?.match(/^https?:\/\/.*(?:youtu.be\/|v\/|u\/\\w\/|embed\/|watch?v=)([^#&?]*).*$/)[1]
// }

function BlogDetails({ data }) {
  const { html } = data.allInfo;
  const {
    title, author, date
  } = data.allInfo.frontmatter;
  return (
    <Layout title={title}>
      <EntireWrapper>
        <HeadingContainer>
          <PageHeader>
            <h1>{title}</h1>
            <p>TODO...</p>
          </PageHeader>
        </HeadingContainer>
        <Explanation>
          {html ?
            <div dangerouslySetInnerHTML={{ __html: html }} />
            :
            <p>This blog page has no content.</p>
          }
        </Explanation>
        <ReactTooltip
          className="ttEdit"
          arrowColor="transparent"
          offset={{ top: -12 }}
          effect="solid"
          scrollHide={false}
          resizeHide={false}
        />
      </EntireWrapper>
    </Layout>
  );
}

export const query = graphql`
  query BlogOne($title: String) {
    allInfo: markdownRemark(frontmatter: {title: {eq: $title}}) {
      html
      excerpt(pruneLength: 160)
      frontmatter {
        title
        author
        date
      }
    }
  }
`

export default BlogDetails;
