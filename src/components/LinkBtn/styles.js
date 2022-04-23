import styled from '@emotion/styled'
import { COLORS } from '../../styles/globalstyles/theme'
import { v } from '../../styles/globalstyles/variables'

export const UnChecked = styled.div`
  font-size: 36px;
  color: var(--color-currLine, ${COLORS.currLine.light});
`
export const GitHubButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 12px;
  border: none;
  background: transparent;
  border-radius: ${v.borderRadius};
  margin-bottom: ${v.mdSpacing};
  cursor: pointer;
  :hover {
    ${UnChecked} {
      color: var(--color-link, ${COLORS.link.light});
    }
  }
`