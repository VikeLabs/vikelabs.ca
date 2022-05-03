import React, { useState, useEffect } from "react"
import Layout from "../components/Layout/Layout"
import styled from '@emotion/styled';
import { COLORS } from '../styles/globalstyles/theme';
import { v, maxq } from '../styles/globalstyles/variables';


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
  margin-top: 0.125rem -${v.mdSpacing};
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


const About = () => {
  const [windowSize, setWindowSize] = useState(null);
  const [textAreaHeight, setTextAreaHeight] = useState(null);

  if (typeof window !== "undefined") {
    window.addEventListener("resize", reportWindowWidth)
    document.onselectionchange = onSelectionChange;
  }
  function reportWindowWidth() {
    setWindowSize(window.innerWidth);
  }
  function reportTextAreaChange() {
    let context = document.getElementById("content");
    if (context) {
      setTextAreaHeight(context.scrollHeight);
    }
  }
  function onSelectionChange() {
    let context = document.getElementById("content");
    if (context) {
      updateTextMeta(context);
    }
  }
  function updateTextMeta(context) {
    let selectionCount = document.getElementById("selectionCount");
    document.getElementById("caretPosition").innerHTML = "Pos " + context.selectionStart;
    if (context.selectionStart !== context.selectionEnd) {
      selectionCount.innerHTML = "(" + (context.selectionEnd - context.selectionStart) + " selected)"
      selectionCount.style.marginRight = "2em";
    }
    else {
      selectionCount.innerHTML = "";
      selectionCount.style.marginRight = "0";
    }
    document.getElementById("wordCount").innerHTML = "Word Count: " + context.value.split(/\s+/g).length;
  }
  function updateTextAreaBounds(context) {
    context.style.width = "100%"; // IMPORTANT: this line MUST be included otherwise width doesnt change when window resizes
    context.style.height = "0px"; // IMPORTANT: this line MUST be included otherwise height doesnt work when removing chars
    context.style.height = context.scrollHeight + "px";
  }
  function updateLineNumbers(context) {
    document.getElementById("lineNumbers").innerHTML = getLineNumsHTML(getNumLinesTextArea(context));
  }
  function getNumLinesTextArea(context) {
    return Math.ceil(context.scrollHeight / (16 * 1.5));
  }
  function getLineNumsHTML(numLines) {
    let htmlStr = "";
    for (let i = 1; i <= numLines; i++) {
      htmlStr += (i + "<br>");
    }
    return htmlStr;
  }
  function updateTextArea() {
    let context = document.getElementById("content");
    if (context) {
      updateTextAreaBounds(context);
      updateLineNumbers(context);
      updateTextMeta(context);
    }
  }

  useEffect(() => {
    const currentURL = window.location.href;
    let dirStr = currentURL.replace(/(^.*:\/{2})*(www\.)?/g, "") // remove 'http(s)://' and remove 'www.'
      .replace(/\.(ca|com|net|org)(?=[^\w])/g, "") // remove '.ca', '.com', '.net', '.org'
      .replace(/((\/)+|\.)(?=.+)/g, " &#10095 "); // &#10095 := html code for large arrow (>)
    document.getElementById("directoryBar").innerHTML = dirStr;
  }, [])

  useEffect(() => {
    updateTextArea();
  }, [windowSize, textAreaHeight]);

  useEffect(() => {
    let context = document.getElementById("content");
    updateTextMeta(context);
  }, [])

  return (
    <Layout title="About">
      <WindowHeader />
      <TerminalContainer>
        <Opening>We are VikeLabs.</Opening>
        <DirectoryBar id="directoryBar" />
        <DirectoryBarSeperator />
        <ContentBox>
          <LineNumbers id="lineNumbers"></LineNumbers>
          <Content id="content" onInput={reportTextAreaChange}
            defaultValue={`VikeLabs is a collective of students who learn to build, deploy, and test software quickly. We view UVic as a kind of laboratory for testing solutions to problems that exist within the UVic community. We limit ourselves to the UVic community because it's much easier to deploy and test solutions to users where we are in close proximity to them and their problems.\n\nWe accept members from every faculty who have an interest in product design/research, software development, business, marketing, or product management.\n\nJoin Us.`}></Content>
        </ContentBox>
        <ContentMeta>
          <CaretPosition id="caretPosition">Pos X</CaretPosition>
          <SelectionCount id="selectionCount">(XX selected)</SelectionCount>
          <WordCount id="wordCount">Word Count: XXX</WordCount>
        </ContentMeta>
      </TerminalContainer>
    </Layout>
  )
}

export default About