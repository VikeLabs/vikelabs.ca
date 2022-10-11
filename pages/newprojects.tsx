import React from 'react'
import ProjectPreview from '../components/ProjectPreview'
import NextJsIcon from '../components/svg/nextjs'
import ReactIcon from '../components/svg/react'
import TsIcon from '../components/svg/typescript'
import TwoColumn, { ProjectExcerpt } from '../components/TwoColumn'
import Wrapper from '../components/Wrapper'

const Projects = () => {
  const projects: ProjectExcerpt[] = [
    {
      name: "Test Project", 
      img: "../vikelabs.jpg", 
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum purus non interdum commodo. Maecenas turpis libero, sagittis eget semper nec, maximus a sapien. Duis a ante elit. Donec elementum, turpis at gravida scelerisque, felis risus aliquet ante, sit amet porttitor nulla nibh quis tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras dui tortor, accumsan sed mauris ut, tempus faucibus ante. Ut finibus ante id feugiat fermentum. Nullam ac ipsum vel leo ullamcorper convallis nec ut elit. Sed dignissim sollicitudin turpis, non fringilla enim mollis nec. Mauris at ante tempor, volutpat elit nec, condimentum odio.",
      stack: [<TsIcon />, <NextJsIcon />, <ReactIcon />]
    },
    {
      name: "Test Project", 
      img: "../vikelabs.jpg", 
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum purus non interdum commodo. Maecenas turpis libero, sagittis eget semper nec, maximus a sapien. Duis a ante elit. Donec elementum, turpis at gravida scelerisque, felis risus aliquet ante, sit amet porttitor nulla nibh quis tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras dui tortor, accumsan sed mauris ut, tempus faucibus ante. Ut finibus ante id feugiat fermentum. Nullam ac ipsum vel leo ullamcorper convallis nec ut elit. Sed dignissim sollicitudin turpis, non fringilla enim mollis nec. Mauris at ante tempor, volutpat elit nec, condimentum odio.",
      stack: [<TsIcon />, <NextJsIcon />, <ReactIcon />]
    },
    {
      name: "Test Project", 
      img: "../vikelabs.jpg", 
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum purus non interdum commodo. Maecenas turpis libero, sagittis eget semper nec, maximus a sapien. Duis a ante elit. Donec elementum, turpis at gravida scelerisque, felis risus aliquet ante, sit amet porttitor nulla nibh quis tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras dui tortor, accumsan sed mauris ut, tempus faucibus ante. Ut finibus ante id feugiat fermentum. Nullam ac ipsum vel leo ullamcorper convallis nec ut elit. Sed dignissim sollicitudin turpis, non fringilla enim mollis nec. Mauris at ante tempor, volutpat elit nec, condimentum odio.",
      stack: [<TsIcon />, <NextJsIcon />, <ReactIcon />]
    },
  ]

  return (
    <Wrapper>
      <div>Projects</div>
      <TwoColumn projects={projects} />
    </Wrapper>
  )
}

export default Projects