import React, {useState, useEffect, createRef} from "react"
import Layout from "../components/Layout/Layout"
import styled from '@emotion/styled';
import {COLORS} from '../styles/globalstyles/theme';
import {globalStyle} from '../styles/globalstyles/globalStyles';

const Page = styled.body`
  background-color: var(--color-background, ${COLORS.background.light});
  color: var(--color-text, ${COLORS.text.light});
  overflow: hidden;
`
const Opening = styled.section`
  background-color: var(--color-comment, ${COLORS.comment.light});
  padding: 2.5rem;
  display: flex;
  justify-content: left;
  align-items: center;
  h1{
    margin-bottom: 0;
  }
`
const ContentBox = styled.section`
  padding-top: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  font-family: "fira code";
`
const LineNumbers = styled.span`
  padding-right: 1.5rem;
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

  //const [windowSize, setWindowSize] = useState(1000);

  function getNumExtraLineBreaks(content) {
    let message = content.innerHTML;
    let emptyLines = message.match(/(<br>)+/g);
    if (emptyLines) {
      return emptyLines.length;
    }
    return 0;
  }
  function getNumLines(content) {    
    if (window !== undefined) {
      let numEmptyLines = getNumExtraLineBreaks(content);
      let style = window.getComputedStyle(content, null);
      let fontSize = parseFloat(style.getPropertyValue('font-size'));
      let fontWidth = 0.64 * fontSize;
      let width = parseFloat(style.getPropertyValue('width'));
      let numCharsInWidth = Math.ceil(width / fontWidth);
      console.log(numCharsInWidth);
      let rawHTMLStr = content.innerText;
      let wordsArray = rawHTMLStr.split(/\s/g).filter( word => word);

      let charsInLine = 0;
      let numLines = 0;
      wordsArray.forEach(word => {
        let len = word.length + 1;
        let current = charsInLine + len;
        if (current > numCharsInWidth) {
          numLines++;
          charsInLine = len;
        }
        else {
          charsInLine += len;
        }
      });
      return numLines + numEmptyLines;
    }
    return 0;
  }

  useEffect(() => {
    let content = document.getElementById("content");
    console.log(getNumLines(content));
  }, [])
  return (
    <Layout title="About">
      <Page>
        <Opening>
          <h1>We are VikeLabs.</h1>
        </Opening>
        <ContentBox id="contentBox">
          <LineNumbers id="lineNumbers">
            1<br></br>
            2<br></br>
            3<br></br>
            4<br></br>
            5<br></br>
            6<br></br>
            7<br></br>
            8<br></br>
            9<br></br>
            10<br></br>
            11<br></br>
            12<br></br>
            13<br></br>
            14<br></br>
            15<br></br>
            16<br></br>
            17<br></br>
            18<br></br>
            19<br></br>
          </LineNumbers>
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
      </Page>
    </Layout>
  )
}

export default About