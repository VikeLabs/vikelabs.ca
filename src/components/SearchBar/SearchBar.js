import React, { useState, useEffect, useRef } from 'react'
import { Green, Search, WBColor, SigilCD, TerminalContainer, Purple, ColoredPart, Line, WindowHeader, ProjectsText } from './styles'
import SearchResult from '../SearchResult/SearchResult'

const SearchBar = ({ title, slug, description, placeholder, data }) => {
  const [filteredData, setFilteredData] = useState(data);
  const handleFilter = (event) => {

    // Turns all hypens into spaces (not visible by user)
    const searchWord = event.target.value.toLowerCase().replaceAll("-"," ")
    const newFilter = data.filter((value) => (
      value.frontmatter.title?.toLowerCase().includes(searchWord)
    ))
    setFilteredData(newFilter)

    // Replace space with hypen and lowercase all chars
    let newText = document.getElementById('terminal').value.toLowerCase().replaceAll(" ","-")
    document.getElementById('terminal').value = newText
  }
  const terminalInput = useRef(null);
  useEffect(() => {
    // from https://stackoverflow.com/a/29509267
    // This code checks if user's device is a phone.
    // If not, the searchbar will focus on page load.
    let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) {
      if (terminalInput.current) {
        terminalInput.current.focus();
      }
    }
  }, []);
  return (
    <div>
      <WindowHeader />
      <TerminalContainer>
        <span>
          <ProjectsText>{title}</ProjectsText>
          <Line>{description}</Line>
          <ColoredPart>
            <Purple>user@vikelabs.ca</Purple>
            <WBColor>:</WBColor>
            <Green>~/{slug}</Green>
          </ColoredPart>
          <SigilCD>$ cd</SigilCD>
          <Search>
            <input 
              ref={terminalInput}
              autoComplete="off"
              id="terminal"
              placeholder={placeholder} 
              type="text" 
              onChange={handleFilter}
            />
          </Search>
        </span>
      </TerminalContainer>
      {filteredData.length === 0 && 
        <p>No projects found.</p>
      }
        {filteredData.map((item) => (
          <SearchResult
            key={item.frontmatter.title}
            title={item.frontmatter.title}
            description={item.frontmatter.description}
            link={item.frontmatter.github}
          />
        ))}
    </div>
  )
}

export default SearchBar