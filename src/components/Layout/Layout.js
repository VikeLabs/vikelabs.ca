import React from "react"
import Sidebar from "../Sidebar/Sidebar"
import { MainContainer, SContainer, SidebarContainer, SidebarRelative, SLayout, SMain } from "./styles"
import { Helmet } from "react-helmet"
import { globalStyle } from "../../styles/globalstyles/globalStyles"
import { COLORS,
  COLOR_MODE_KEY,
  INITIAL_COLOR_MODE_CSS_PROP
} from '../../styles/globalstyles/theme'
import { Global } from '@emotion/react'
import MobileHeader from "../MobileHeader/MobileHeader"

export const ThemeContext = React.createContext()
const Layout = (props) => {
  const [colorMode, rawSetColorMode] = React.useState(undefined);
  React.useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.style.getPropertyValue(
      INITIAL_COLOR_MODE_CSS_PROP
    );
    rawSetColorMode(initialColorValue);
  }, []);
  const contextValue = React.useMemo(() => {
    function setColorMode(newValue) {
      const root = window.document.documentElement;
      localStorage.setItem(COLOR_MODE_KEY, newValue);
      Object.entries(COLORS).forEach(([name, colorByTheme]) => {
        const cssVarName = `--color-${name}`;
        root.style.setProperty(cssVarName, colorByTheme[newValue]);
      })
      rawSetColorMode(newValue);
    }
    return {
      colorMode,
      setColorMode,
    };
  }, [colorMode, rawSetColorMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <Global styles={globalStyle} />
      <Helmet>
        <title>{props.title}</title>
      </Helmet>
      <MobileHeader />
      <SLayout>
        <SContainer>
          <SidebarRelative>
            <SidebarContainer id='sidenav'>
              <Sidebar />
            </SidebarContainer>
          </SidebarRelative>
          <MainContainer>
            <SMain>{props.children}</SMain>
          </MainContainer>
        </SContainer>
      </SLayout>
    </ThemeContext.Provider>
  )
}

export default Layout