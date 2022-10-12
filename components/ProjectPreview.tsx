/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { ReactNode } from 'react'
import { ProjectExcerpt } from './TwoColumn'

const Project = styled.div`
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: var(--br);
  transition: 0.3s ease;
  :hover {
    box-shadow: 0 0 6px rgba(0,0,0,0.1);
    cursor: pointer;
  }
`

const Preview = styled.div`
  padding: var(--md) calc(1.25 * var(--md));
`

const Title = styled.h2`
  margin-bottom: 8px;
`

const Image = styled.img`
  border-radius: var(--br) var(--br) 0 0;
`

const Desc = styled.p`
  white-space: nowrap;
  font-size: 15px;
  line-height: 1.5em;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #555;
  margin-bottom: 10px;
  @supports (-webkit-line-clamp: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`

const Stack = styled.div`
  display: flex;
  gap: 6px;
`

const StackItem = styled.div`
  border-radius: 3px;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  line-height: 1rem;
  color: var(--white);
  font-weight: 500;
`

const ProjectPreview = ({project}: {project: ProjectExcerpt}) => {
  return (
    <Project>
      {/* Show "Learn more" on hover */}
      <Image src={project.img}/>
      <Preview>
        <Title>
          {project.name}
        </Title>
        <Desc>
          {project.desc}
        </Desc>
        <Stack>
          {project.stack.map((item: {color: string, name: string}) => (
            <StackItem css={{backgroundColor: item.color}}>{item.name}</StackItem>
            // <StackItem>{item}</StackItem>
          ))}
        </Stack>
          
      </Preview>
    </Project>
  )
}

export default ProjectPreview