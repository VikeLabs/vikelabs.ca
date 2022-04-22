import styled from '@emotion/styled'
import { COLORS } from '../../styles/globalstyles/theme'
import { v, maxq } from '../../styles/globalstyles/variables'

export const WindowHeader = styled.div`
  background: var(--color-comment, ${COLORS.comment.light});
  padding: 3px;
  display: flex;
  justify-content: end;
  height: 1.2em;
`
export const TerminalContainer = styled.div`
  background: var(--color-background, ${COLORS.background.light});
  padding: calc(${v.mdSpacing} / 1.5) ${v.mdSpacing} ${v.mdSpacing};
  border-width: 0 3px 3px 3px;
  border-style: solid;
  border-color: var(--color-comment, ${COLORS.comment.light});
  font-family: 'Fira Code', monospace;
  font-weight: 500;
  margin-bottom: 1em;
`
export const ProjectsText = styled.h1`
  justify-content: start;
`
export const Line = styled.p`
  color: var(--color-text, ${COLORS.text.light});
  margin-bottom: 0;
  font-weight: 400;
`
export const Comment = styled.span`
  color: var(--color-comment, ${COLORS.comment.light});
`
export const ColoredPart = styled.span`
  ${maxq[1]} {
    display: none;
  }
`
export const Purple = styled.span`
  color: var(--color-purple, ${COLORS.purple.light});
`
export const WBColor = styled.span`
  color: var(--color-text, ${COLORS.text.light});
`
export const Green = styled.span`
  color: var(--color-green, ${COLORS.green.light});
`
export const SigilCD = styled.span`
  margin-right: 0.6em;
`
export const CdCommand = styled.span`
  margin-right: 0.6em;
`
export const Search = styled.span`
  width: 100%;
  input {
    
    font-family: 'Fira Code', monospace;
    font-weight: 500;
    letter-spacing: inherit;
    font-size: 1em;
    //24 char, 0.6em per char
    width: calc(100% - (25 * 0.6em) - 2em);
    ${maxq[1]} {
      width: calc(100% - (4 * 0.6em) - 1em);
    }
    outline: none;
    border: none;
    background: transparent;
    color: var(--color-text, ${COLORS.text.light});
    ::placeholder {
      font-weight: 500;
      color: var(--color-comment, ${COLORS.comment.light})
    }
  }
`