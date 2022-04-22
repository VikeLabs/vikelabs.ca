import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import "./project-styling.css"
import { HeadingContainer, PageHeader, EntireWrapper, Explanation } from "./project-styling"
import { LiteYoutubeEmbed } from 'react-lite-yt-embed'; // incase it's needed
import ReactTooltip from 'react-tooltip';

// for react-lite-yt-embed
// const extractVideoURL = (demo) => {
//   return demo?.match(/^https?:\/\/.*(?:youtu.be\/|v\/|u\/\\w\/|embed\/|watch?v=)([^#&?]*).*$/)[1]
// }

function ProjectDetails({ data }) {
  const { html } = data.allInfo;
  const {
    title, description, github, members
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
            <p>This project page has no content.</p>
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
  query ProjectOne($title: String) {
    allInfo: markdownRemark(frontmatter: {title: {eq: $title}}) {
      html
      frontmatter {
        title
        description
        github
        members {
          name
          role
        }
      }
    }
  }
`

export default ProjectDetails;
