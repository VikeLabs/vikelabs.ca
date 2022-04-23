import React from 'react'
import { SLink, SLinkA, SLinkIcon } from './styles'
import { SLinkContainer } from '../Sidebar/styles'

export const InternalLinks = ({label, icon, link, isActive}) => {
  return (
    <SLinkContainer key={label} isActive={isActive}>
      <SLink to={link}>
        <SLinkIcon>{icon}</SLinkIcon>
        <span>{label}</span>
      </SLink>
    </SLinkContainer>
  )
}

export const ExternalLinks = ({label, icon, link}) => {
  return (
    <SLinkContainer key={label}>
      <SLinkA href={link} target="_blank">
        <SLinkIcon>{icon}</SLinkIcon>
        <span>{label}</span>
      </SLinkA>
    </SLinkContainer>
  )
}