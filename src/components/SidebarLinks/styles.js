import styled from "@emotion/styled"
import { css } from "@emotion/react"
import { Link } from "gatsby"
import { v } from "../../styles/globalstyles/variables"

const linkStyle = css`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  font-size: 16px;
  padding: calc(${v.smSpacing} - 2px) 0;
`
export const SLink = styled(Link)`
  ${linkStyle};
`
export const SLinkA = styled.a`
  ${linkStyle};
`
export const SLinkIcon = styled.div`
  padding: ${v.smSpacing} ${v.mdSpacing};
  display: flex;
  svg {
    font-size: 24px;
  }
`
