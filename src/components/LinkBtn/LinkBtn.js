import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { GitHubButton, UnChecked } from './styles'

const LinkBtn = ({ github }) => {

  // If you're getting this warning in console: 
  // Warning: validateDOMNesting(...): <a> cannot appear as a descendant of <a>.
  // Ignore it.

  return (
    <a target="_blank" href={`https://github.com/vikelabs/${github}`}>
      <GitHubButton onClick={(e) => e.stopPropagation()}>
        <UnChecked><FaGithub /></UnChecked>
      </GitHubButton>
    </a>
  )
}

export default LinkBtn