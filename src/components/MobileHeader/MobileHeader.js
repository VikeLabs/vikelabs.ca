import React, { useState } from 'react'
import { FiMenu, FiXCircle } from 'react-icons/fi'
import { MHeaderRelative, MHeader, MobileContainer, Logo, MobileHeaderLink, MenuIcon } from './styles'
 
const MobileHeader = () => {
	const [menuActive, setMenuActive] = useState(false)
	const showSidebar = () => {
		if (document.getElementById('sidenav').style.display === 'block') {
			document.getElementById('sidenav').style.display = 'none'
			setMenuActive(false)
		} else {
			document.getElementById('sidenav').style.display = 'block'
			setMenuActive(true)
		}
	}
	return (
		<MHeaderRelative>
			<MHeader>
				<MobileContainer>
					<Logo>
						<MobileHeaderLink to="/">
							<h2>VikeLabs</h2>
						</MobileHeaderLink>
					</Logo>
					<MenuIcon onClick={() => showSidebar()}>
						{menuActive ? <FiXCircle /> : <FiMenu />}
					</MenuIcon>
				</MobileContainer>
			</MHeader>
		</MHeaderRelative>
	)
}

export default MobileHeader