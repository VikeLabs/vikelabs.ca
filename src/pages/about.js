import React, {useState, useEffect} from "react"
import Layout from "../components/Layout/Layout"
import styled from '@emotion/styled';
import {
  WindowHeader, 
  TerminalContainer,
  Opening,
  DirectoryBar,
  DirectoryBarSeperator,
  ContentBox,
  LineNumbers,
  Content,
  ContentMeta,
  CaretPosition,
  SelectionCount,
  WordCount } from '../styles/pagestyles/about'


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
      <WindowHeader/>
      <TerminalContainer>
        <Opening>We are VikeLabs.</Opening>
        <DirectoryBar id="directoryBar"/>
        <DirectoryBarSeperator/>
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