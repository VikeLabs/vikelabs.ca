import styled from "@emotion/styled"
import { COLORS } from "../../styles/globalstyles/theme"
import { v, maxq } from "../../styles/globalstyles/variables"

export const HeadingContainer = styled.div`
  background: var(--color-background, ${COLORS.background.light});
  padding: ${v.mdSpacing};
  border-radius: calc(${v.borderRadius} * 2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 1.4em;
    margin-top: -0.2em;
    margin-bottom: 0.1em;
    justify-content: start;
  }
  span {
    margin-bottom: 0.1em;
  }
  margin-bottom: 1.5em;
`
export const PageHeader = styled.div`
  margin-bottom: 0.25em;
  margin-right: 0.25em;
`
export const EntireWrapper = styled.div`
  .ttEdit {
    padding: 3px 6px 4px 6px;
    background-color: var(--color-text, ${COLORS.text.light});
    color: var(--color-ttText, ${COLORS.ttText.light});
    opacity: 1 !important;
    font-size: 1rem;
    max-width: 13em;
    text-align: center;
    transition: none;
  }
`
export const Explanation = styled.div`
  padding: 1.5em 0;
  border-radius: calc(${v.borderRadius} * 2);
  ${maxq[1]} {
    padding: 1.5em 0;
  }
  ol, ul {
    margin-left: 2em;
    margin-bottom: 1em;
    li {
      margin: 5px 0;
      line-height: 1.5em;
    }
    ${maxq[1]} {
      margin-left: 1em;
    }
  }
  p:last-child {
    padding-bottom: 1em;
  }
  h3:not(first-child),h4:not(first-child) {
    padding-top: 0.5em;
  }
`