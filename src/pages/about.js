import React, {useState, useEffect} from "react"
import Layout from "../components/Layout/Layout"
import styled from '@emotion/styled';
import {COLORS} from '../styles/globalstyles/theme';
import {globalStyle} from '../styles/globalstyles/globalStyles';
import { v } from '../styles/globalstyles/variables';


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
  margin-bottom: 0.5rem;
  box-shadow: 0 0.25rem 0.125rem -0.125rem var(--color-backgroundShadow, ${COLORS.backgroundShadow.light});
`
const ContentBox = styled.section`
  display: flex;
`
const LineNumbers = styled.span`
  padding-right: 0.64rem;
  color: var(--color-comment, ${COLORS.comment.light});
`
const Content = styled.span`

`
const Ending = styled.section`
  padding: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  h2{
    margin-bottom: 0;
  }
`

const About = () => {
  const [windowSize, setWindowSize] = useState(null);

  if (typeof window !== "undefined") {
    window.addEventListener("resize", reportWindowWidth)
  }

  function reportWindowWidth() {
    setWindowSize(window.innerWidth);
  }

  function getNumLines(content) {
    if (typeof window !== "undefined") {
      let style = window.getComputedStyle(content, null);
      let fontWidth = 0.64 * parseFloat(style.getPropertyValue('font-size'));
      let width = parseFloat(style.getPropertyValue('width'));
      let numCharsInWidth = Math.ceil(width / fontWidth);
      let wordsArray = content.innerHTML.replace(/<br>/g, " \0 ").split(/\s/g);
      let charsInLine = 0;
      let numLines = 0;
      wordsArray.forEach(word => {
        let len = word.length + 1; // add one for the extra space between words that was removed when split was performed
        let current = charsInLine + len;
        if (current > numCharsInWidth || word === "\0") {
          numLines++;
          charsInLine = len;
        }
        else {
          charsInLine += len;
        }
      });
      if (charsInLine > 0) {
        numLines++;
      }
      return numLines;
    }
    return 0;
  }

  function DoLineNumsHTML(numLines) {
    let htmlStr = "";
    for (let i = 1; i <= numLines; i++) {
      htmlStr += (i + "<br>");
    }
    return htmlStr;
  }

  useEffect(() => {
    const currentURL = window.location.href;
    let dirStr = currentURL.replace(/(\/)+/g, " &#10095 "); // &#10095 := html code for large arrow (>)
    document.getElementById("directoryBar").innerHTML = dirStr;
  }, [])

  useEffect(() => {
    let content = document.getElementById("content");
    let numLines = getNumLines(content);
    let lineNums = document.getElementById("lineNumbers");
    lineNums.innerHTML = DoLineNumsHTML(numLines);
  }, [windowSize]);

  return (
    <Layout title="About">
      <WindowHeader/>
      <TerminalContainer>
        <Opening>We are VikeLabs.</Opening>
        <DirectoryBar id="directoryBar"/>
        <ContentBox>
          <LineNumbers id="lineNumbers"></LineNumbers>
          <Content id="content">
            VikeLabs is a collective of students who learn to build, deploy, and test software quickly. We view UVic as a kind of laboratory for testing solutions to problems that exist within the UVic community. We limit ourselves to the UVic community because it's much easier to deploy and test solutions to users where we are in close proximity to them and their problems.
            <br></br>
            <br></br>
            We accept members from every faculty who have an interest in product design/research, software development, business, marketing, or product management.
          </Content>
          </ContentBox>
        <Ending>
          <h2>Join us.</h2>
        </Ending>
      </TerminalContainer>
    </Layout>
  )
}

export default About