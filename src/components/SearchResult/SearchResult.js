import React from 'react'
import { ResultLink, ResultContainer, ResultBlock, Title, Excerpt, LinkBtnContainer, MetaContainer } from './styles'
import LinkBtn from '../LinkBtn/LinkBtn'
import LastCommit from '../LastCommit/LastCommit'

const SearchResult = ({ title, description, link }) => {
  let pageName = "Project not found"
  if (title !== null) {
    pageName = title
  }
  return (
    <React.Fragment key={pageName}>
      <ResultLink to={pageName.toLowerCase().replace(/\ /g, '-')}>
        <ResultContainer>
          <ResultBlock>
            <MetaContainer>
              <Title>{pageName}</Title>
              <Excerpt>{description}</Excerpt>
              { typeof link !== 'undefined' && 
                <LastCommit github={link} />
              }
            </MetaContainer>
            { typeof link !== 'undefined' &&
              <LinkBtnContainer>
                {link !== null && 
                  <LinkBtn github={link} />
                }
              </LinkBtnContainer>
            }
          </ResultBlock>
        </ResultContainer>
      </ResultLink>
    </React.Fragment>
  )
}

export default SearchResult