import styled from '@emotion/styled'
import { v, minq } from '../../styles/globalstyles/variables'
import { COLORS } from '../../styles/globalstyles/theme'
import { Link } from 'gatsby'

export const MHeaderRelative = styled.div`
  padding-bottom: 4em;
  position: relative;
  ${minq[1]} {
    display: none;
  }
`
export const MHeader = styled.div`
  width: 100%;
  background: var(--color-background, ${COLORS.background.light});
  position: fixed;
  z-index: 999;    
  padding: 0.5em 0;
`
export const MobileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const MenuIcon = styled.div`
  padding: ${v.smSpacing} 5% 0 5%;
  font-size: 30px;
`
export const Logo = styled.div`
  margin-left: 5%;
`
export const MobileHeaderLink = styled(Link)`
  text-decoration: none;
  color: var(--color-text, ${COLORS.text.light});
  h2 {
    margin-bottom: 0;
    font-size: 20px;
  }
`