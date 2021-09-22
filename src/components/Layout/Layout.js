import React, { useState, useEffect } from 'react';

import MainNavigation from './MainNavigation';
import MobileNavigation from './MobileNavigation';

const Layout = (props) => {
	const [width, setWidth] = useState(window.innerWidth);
	const breakpoint = 680;

	useEffect(() => {
		window.addEventListener('resize', () => setWidth(window.innerWidth));
	}, []);

	return (
		<>
			{width < breakpoint ? <MobileNavigation /> : <MainNavigation />}
			<main>{props.children}</main>
		</>
	);
};

export default Layout;
