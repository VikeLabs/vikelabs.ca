import styled from "@emotion/styled"
import { maxq } from "../../styles/globalstyles/variables"
import { COLORS } from "../../styles/globalstyles/theme"

export const SLayout = styled.div`
  display: flex;
`
export const SContainer = styled.div`
  width: 90%;
  justify-content: center;
  max-width: 1100px;
  margin: 0 auto;
`
export const SidebarRelative = styled.div`
  position: relative;
  z-index: 10;
`
export const SidebarContainer = styled.div`
  position: fixed;
  top: 4em;
  max-width: 1100px;
  width: 100%;
  pointer-events: none;
  ${maxq[1]} {
    display: none;
    top: 2em;
  }
`
export const MainContainer = styled.div`
  padding-left: 26%;
  ${maxq[1]} {
    padding: 0 0 5% 0;
  }
`
export const SMain = styled.main`  
  padding: 4em 2em 2em 2em;
  ${maxq[1]} {
    padding: 0;
    margin-top: 5%;
  }
  a {
    text-decoration: none;
    color: var(--color-link, ${COLORS.link.light});
  }
  a:hover {
    color: var(--color-linkHover, ${COLORS.linkHover.light});
    background-color: var(--color-link, ${COLORS.link.light});
  }
`