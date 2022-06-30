import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import "./project-styling.css"
import { HeadingContainer, PageHeader, EntireWrapper, Explanation, Teststuff, Teammates, Memberdetail, MemberIcon, Socials } from "./project-styling"
import { LiteYoutubeEmbed } from 'react-lite-yt-embed'; // incase it's needed
import { FaGithub, FaLinkedin} from 'react-icons/fa'; //Import more if required
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
          {/* {html ?
            <div dangerouslySetInnerHTML={{ __html: html }} />
            :
            <p>This project page has no content.</p>
          } */}
          {/* Could use a font change for both h tags */}
          {/* Honestly I am kinda digging both styles lol */}
          {/* Didn't use any display: blocks for styling, possible issue? Learn */}

          <h1>What is Vikelabs?</h1>
          <p>Consist of a team of UVic students who build apps to learn more about software development, product management, and design.</p>
          <p>&lt;Insert latest update of project here&gt;</p>

            <h1>Meet the members!!!</h1>
            {/* Might need to figure out why hovering just automatically works here  */}
            {/* Let there be span?? */}
              <Teammates>
                <Memberdetail>
                  <h4>Lechonkyyyy</h4>
                  <p>Project Coordinator</p>
                  <Socials>
                      <a>
                        <FaLinkedin />
                      </a>
                      <a>
                        <FaGithub />
                      </a>
                  </Socials>
                </Memberdetail>
                <MemberIcon>
                  <img src = {lechonk} alt='lechonk'></img>
                </MemberIcon>
              </Teammates>
              <Teammates>
                <Memberdetail>
                  <h4>Lechonk</h4>
                  <p>Project Coordinator</p>
                  <Socials>
                      <a>
                        <FaLinkedin />
                      </a>
                      <a>
                        <FaGithub />
                      </a>                   
                  </Socials>
                </Memberdetail>
                <MemberIcon>
                  <img src = {lechonk} alt='lechonk'></img>
                </MemberIcon>
              </Teammates>
              <Teammates>
                <Memberdetail>
                  <h4>Lechonk</h4>
                  <p>Project Coordinator</p>
                  <Socials>  
                      <a>
                        <FaGithub />
                      </a>                 
                  </Socials>
                </Memberdetail>
                <MemberIcon>
                  <img src = {lechonk} alt='lechonk'></img>
                </MemberIcon>
              </Teammates>
        

            
          </Explanation>
          </IconContext.Provider>

        {/* Haven't decide how to design this lol */}
        {/* Will leave this to someone else or future me */}
        <h2>Tech Stack Used</h2>
        <Teststuff>
            <p>Insert someone else's responsibility here</p>
            
            {/* This is definetely not the final design of this section. Will improve on it later I think, hopefully*/}

        </Teststuff>

        <h3>&lt;Insert link to take you back to Vikelabs main page&gt;</h3>
        {/* This looks too big, either make it smaller or use a smaller h tag */}
        {/* However, the progress so far 6/13/2022 is pretty good, not the best work i've done so far, but rough ideas have been laid out and it honestly looks better than expected */}
        {/* Not sure if I want to continue with making a rough design 2 or 3 or try to make design 1 as good as possible and show it to Robert chen ;-; */}
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
