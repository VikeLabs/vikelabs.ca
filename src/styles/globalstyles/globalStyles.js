import { COLORS } from "./theme"
import { css } from '@emotion/react'
import { maxq } from './variables'

export const globalStyle = css`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background: var(--color-currLine, ${COLORS.currLine.light});
    color: var(--color-text, ${COLORS.text.light});
    font-family: 'IBM Plex Sans', sans-serif;
    letter-spacing: .6px;
    overflow-y: scroll;
    font-size: 1rem;
  }
  button {
    font-family: 'Fira Code', monospace;
    font-size: 1rem;
  }
  h1,h2,h3,h4,h5,h6,strong {

    font-weight: 500;

    margin-bottom: 0.6em;
  }
  h1 {
    font-family: 'Fira Code', monospace;
    font-size: 1.8em;
    margin-bottom: 0.6em;
    display: flex;
    justify-content: center;
  }
  h2 {
    font-size: 1.6rem;
    ${maxq[1]} {
      font-size: 1.4rem;
    }
  }
  h3 {
    font-size: 1.4rem;
    ${maxq[1]} {
      font-size: 1.25rem;
    }
  }
  h4 {
    font-size: 1.2rem;
    ${maxq[1]} {
      font-size: 1.1rem;
    }
  }
  p {
    line-height: 1.5em;
    :not(:last-child) {
      margin-bottom: 1em;
    }
  }

  // This fixes tooltip FOUC
  // A line shows up at page bottom every reload if this is removed
  // https://github.com/wwayne/react-tooltip/issues/588
  .__react_component_tooltip {
    position: fixed;
    opacity: 0 !important;
    &.show {
      opacity: 1 !important;
    }
  }
`