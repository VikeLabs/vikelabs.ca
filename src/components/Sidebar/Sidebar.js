import React, { useContext, useEffect } from 'react'
import { SSidebar } from './styles'
import { FiMoon, FiSun } from "react-icons/fi"
import { ThemeContext } from "../Layout/Layout"
import { useLocation } from "@reach/router";
import { COLOR_MODE_KEY, INITIAL_COLOR_MODE_CSS_PROP } from '../../styles/globalstyles/theme';
import { InternalLinks, ExternalLinks } from '../SidebarLinks/SidebarLinks'
import { internalLinks, externalLinks } from '../SidebarLinks/links'
import { SDivider, SLinkContainer, SToggle, SToggleLabel, SunContainer, MoonContainer } from './styles'


const Sidebar = () => {
  const { colorMode, setColorMode } = useContext(ThemeContext);
  const location = useLocation().pathname
  const parentLocation = "/" + location.split('/')[1]
  useEffect(() => {
    if (typeof localStorage.getItem(COLOR_MODE_KEY) === 'string') {
      setColorMode(localStorage.getItem(COLOR_MODE_KEY))
    }
  })
  return (
    <SSidebar>
      {internalLinks.map(({ label, icon, link }) => (
        <InternalLinks
          key={label}
          label={label}
          icon={icon}
          link={link}
          isActive={parentLocation === link}
        />
      ))}
      {externalLinks.map(({ label, icon, link }) => (
        <ExternalLinks key={label} label={label} icon={icon} link={link} />
      ))}
      <SDivider />
      <SLinkContainer key={colorMode === "light" ? 'Dark Theme' : 'Light Theme'}>
        <SToggle
          onClick={
            () => {
              setColorMode(colorMode === "light" ? 'dark' : 'light');
              localStorage.setItem(COLOR_MODE_KEY, colorMode === "light" ? 'dark' : 'light')
              // this needs to be here otherwise we get that "wrong initial state" bug
              document.documentElement.style.setProperty(INITIAL_COLOR_MODE_CSS_PROP, colorMode === "light" ? 'dark' : 'light');
            }
          }
        >
          <MoonContainer><FiMoon /></MoonContainer>
          <SunContainer><FiSun /></SunContainer>
          <SToggleLabel></SToggleLabel>
        </SToggle>
      </SLinkContainer>
    </SSidebar>
  )
}

export default Sidebar