import React, { ReactPropTypes } from 'react'
import styled from "@emotion/styled";
import ProjectPreview from './ProjectPreview';

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1em;
`
const Column = styled.div`
  flex-basis: calc(50% - 0.5em);
`

export interface ProjectExcerpt {
  name: string;
  img: string;
  desc: string;
  stack: {
    color: string,
    name: string,
  }[];
}

const TwoColumn = ({projects}: {projects: ProjectExcerpt[]}) => {
  return (
    <ColumnContainer>
      {projects.map((project: ProjectExcerpt) => (
        <Column>
          <ProjectPreview project={project}/>
        </Column>
      ))}
    </ColumnContainer>
  )
}

export default TwoColumn