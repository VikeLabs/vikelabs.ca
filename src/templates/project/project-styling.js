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

export const Teststuff = styled.div`
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
    // background: black;
  }
  margin-bottom: 1.5em;
  img {
    width: 150px;
    height: 150px;
    border-radius: 75%;
    border: 2px solid #c3b4fd;
    padding: 3px;
  }
`

export const Sicon = styled.div`
  padding: 5px;

`

// padding: ${v.mdSpacing};
// unsure how padding is working against me here, making the items within the container "smaller". Kind of weird
export const Members = styled.div`
  display: flex;
  background: var(--color-background, ${COLORS.background.light});
  flex-direction: column;
  justify-content: space-between;
  h2 {
    color:black;
    font-size: 69px;
    font-family: Impact;
  }
  border-radius: calc(${v.borderRadius} * 2);
  margin-bottom: 1.5em;
  padding: ${v.mdSpacing};
`

// Individual teammates detail
export const Teammates = styled.div `
  background: var(--color-background, ${COLORS.background.light});
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: calc(${v.borderRadius} * 2);
  padding: ${v.mdSpacing};
  margin-bottom: 1.5em;
`
// Members role and name and social details
// Consider justify-content: flex-start
// Might need to research on how flex grow works here with another component thats not a flexbox
// RENAME THIS TO SOMETHING BETTER SO THAT IT CAN ALSO BE USED FOR TECH STACK USED
export const Memberdetail = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 0.1em;
  flex-grow: 2;

`

// Social Detail
export const Socials = styled.div `
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

export const SocialIc = styled.div`
  margin-right: 1.5em;
`

// Member Image
export const MemberIcon = styled.div `
  img {
    width: 150px;
    height: 150px;
    border-radius: 75%;
    border: 2px solid #c3b4fd;
    padding: 3px;
  }
`