import React, { useEffect } from 'react'
import NextJsIcon from '../components/svg/nextjs'
import ReactIcon from '../components/svg/react'
import TsIcon from '../components/svg/typescript'
import Wrapper from '../components/wrapper'

type ProjectExcerpt = {
  name: string;
  img: string;
  desc: string;
  stack: {name: string, color: string}[];
}

const Projects = () => {
  const projects: ProjectExcerpt[] = [
    {
      name: "Test Project", 
      img: "../vikelabs.jpg", 
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum purus non interdum commodo. Maecenas turpis libero, sagittis eget semper nec, maximus a sapien. Duis a ante elit. Donec elementum, turpis at gravida scelerisque, felis risus aliquet ante, sit amet porttitor nulla nibh quis tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras dui tortor, accumsan sed mauris ut, tempus faucibus ante. Ut finibus ante id feugiat fermentum. Nullam ac ipsum vel leo ullamcorper convallis nec ut elit. Sed dignissim sollicitudin turpis, non fringilla enim mollis nec. Mauris at ante tempor, volutpat elit nec, condimentum odio.",
      stack: [
        {name: "TypeScript", color: "#007acc"},
        {name: "React", color: "#1fafd3"},
        {name: "TypeScript", color: "#007acc"},
      ]
    },
    {
      name: "Test Project", 
      img: "../vikelabs.jpg", 
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum purus non interdum commodo. Maecenas turpis libero, sagittis eget semper nec, maximus a sapien. Duis a ante elit. Donec elementum, turpis at gravida scelerisque, felis risus aliquet ante, sit amet porttitor nulla nibh quis tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras dui tortor, accumsan sed mauris ut, tempus faucibus ante. Ut finibus ante id feugiat fermentum. Nullam ac ipsum vel leo ullamcorper convallis nec ut elit. Sed dignissim sollicitudin turpis, non fringilla enim mollis nec. Mauris at ante tempor, volutpat elit nec, condimentum odio.",
      stack: [
        {name: "TypeScript", color: "#007acc"}
      ]
    },
    {
      name: "Test Project", 
      img: "../vikelabs.jpg", 
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum purus non interdum commodo. Maecenas turpis libero, sagittis eget semper nec, maximus a sapien. Duis a ante elit. Donec elementum, turpis at gravida scelerisque, felis risus aliquet ante, sit amet porttitor nulla nibh quis tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras dui tortor, accumsan sed mauris ut, tempus faucibus ante. Ut finibus ante id feugiat fermentum. Nullam ac ipsum vel leo ullamcorper convallis nec ut elit. Sed dignissim sollicitudin turpis, non fringilla enim mollis nec. Mauris at ante tempor, volutpat elit nec, condimentum odio.",
      stack: [
        {name: "TypeScript", color: "#007acc"}
      ]
    },
  ]

  return (
    <Wrapper>
      <div>
        Projects / children here
      </div>
    </Wrapper>
  )
}

export default Projects