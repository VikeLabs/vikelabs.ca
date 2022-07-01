import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import "./project-styling.css"
import { HeadingContainer, PageHeader, EntireWrapper, Explanation, TechStackPlaceholder, Teammates,  MemberIcon } from "./project-styling"
import Member from './project-members';
import { LiteYoutubeEmbed } from 'react-lite-yt-embed'; // incase it's needed
import ReactTooltip from 'react-tooltip';
import lechonk from '../../images/chonk.png'
import { IconContext } from 'react-icons';

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
            <p>{description}</p>
          </PageHeader>
        </HeadingContainer>
        <IconContext.Provider value={{size:"2em" }}>
          <Explanation>
            {/* Commented below incase required */}
            {/* {html ?
              <div dangerouslySetInnerHTML={{ __html: html }} />
              :
              <p>This project page has no content.</p>
            } */}
            <h1>What is Vikelabs?</h1>
            <p>Consist of a team of UVic students who build apps to learn more about software development, product management, and design.</p>
            <p>&lt;Insert latest update of project here&gt;</p>

              <h1>Meet the members!!!</h1>
              {/* Might need to figure out why hovering just automatically works here  */}
              {/* Let there be span?? */}
              <Teammates>
                  <Member 
                    name="Le Chonk" 
                    role="Project Coordinator" 
                    git='https://www.lttstore.com' 
                    link='#'/>
                  <MemberIcon>
                    <img src = {lechonk} alt='lechonk'></img>
                  </MemberIcon>
              </Teammates>
              <Teammates>
                <Member 
                    name="Le Chonk" 
                    role="Project Coordinator" 
                    git='https://www.youtube.com/watch?v=dQw4w9WgXcQ' 
                    link='#'/>
                  <MemberIcon>
                    <img src = {lechonk} alt='lechonk'></img>
                  </MemberIcon>
              </Teammates>
              <Teammates>
                <Member 
                    name="Le Chonk" 
                    role="Project Coordinator" 
                    git='https://google.ca' 
                    link='#'/>
                  <MemberIcon>
                    <img src = {lechonk} alt='lechonk'></img>
                  </MemberIcon>
              </Teammates>         
            </Explanation>
          </IconContext.Provider>

        {/* Haven't decide how to design this lol */}
        {/* Will leave this to someone else or future me */}
        <h2>Tech Stack Used</h2>
        <TechStackPlaceholder>
            <p>Insert someone else's responsibility here</p>
        </TechStackPlaceholder>

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
