import { NavLink } from 'react-router-dom'
import RenderNavigation from './RenderNavigation'
import { useState } from 'react';

const Header = () => {
	const [collapseMobileMenu, setCollapseMobileMenu] = useState(false);
	const [loadingMobileMenuState, setLoadingMobileMenuState] = useState(false);

	const handleMobileMenuToggleRequest = () => {
		setLoadingMobileMenuState(true)

		setTimeout(()=>{
			setLoadingMobileMenuState(false)
			setCollapseMobileMenu(!collapseMobileMenu)
		}, 100)
	}

	return (
		<nav className="navbar navbar-expand-lg bg-light">
			<div className="container">
				<NavLink className="navbar-brand" title={ process.env.REACT_APP_NAME } to="/">{ process.env.REACT_APP_LOGO }</NavLink>
				<button 
					className={`navbar-toggler ${ collapseMobileMenu ? "" : "collapsed"}`} 
					type="button"
					onClick={handleMobileMenuToggleRequest}
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<RenderNavigation setCollapseMobileMenu={setCollapseMobileMenu} collapseMobileMenu={collapseMobileMenu} loadingMobileMenuState={loadingMobileMenuState} />
			</div>
		</nav>
	);
}

export default Header
