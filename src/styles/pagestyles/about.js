import React from 'react'
import styled from "@emotion/styled"
import {COLORS} from '../globalstyles/theme';
import {v, maxq} from '../globalstyles/variables';

const WindowHeader = styled.div`
  background: var(--color-comment, ${COLORS.comment.light});
  padding: 3px;
  display: flex;
  justify-content: end;
  height: 1.2em;
`
const TerminalContainer = styled.div`
  background: var(--color-background, ${COLORS.background.light});
  padding: calc(${v.mdSpacing} / 1.5) ${v.mdSpacing} ${v.mdSpacing};
  padding-bottom: 0;
  border-width: 0 3px 3px 3px;
  border-style: solid;
  border-color: var(--color-comment, ${COLORS.comment.light});
  font-family: 'Fira Code', monospace;
  font-weight: 500;
  margin-bottom: 1em;
`
const Opening = styled.h1`
  justify-content: start;
`
const DirectoryBar = styled.section`
  color: var(--color-comment, ${COLORS.comment.light});
`
const DirectoryBarSeperator = styled.div`
  height: 0.35rem;
  margin: 0.125rem -${v.mdSpacing};
  background: linear-gradient(var(--color-backgroundShadow, ${COLORS.backgroundShadow.light}), transparent);
`
const ContentBox = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`
const LineNumbers = styled.span`
  margin-top: 0.1rem;
  padding-right: 0.64rem;
  min-width: 5%;
  color: var(--color-comment, ${COLORS.comment.light});
  text-align: right;
  line-height: 1.5rem;
`
const Content = styled.textarea`
  background: inherit;
  color: inherit;
  width: 100%;
  height: calc(line-height * font-size);
  font: inherit;
  resize: none;
  overflow: hidden;
  line-height: 1.5rem;
  border: 1px solid var(--color-background, ${COLORS.background.light});
  :focus {
    outline: none;
  }
`
const ContentMeta = styled.section`
  margin-left: -${v.mdSpacing};
  margin-right: -${v.mdSpacing};
  background-color: var(--color-currLine, ${COLORS.currLine.light});
  height: 2rem;
  display: flex;
  justify-content: end;
  align-items: center;
  ${maxq[1]} {
    display: none;
  }
`
const CaretPosition = styled.span`
  margin-right: 2em;
`
const SelectionCount = styled.span`
  margin-right: 2em;
`
const WordCount = styled.span`
  margin-right: 1em;
`

