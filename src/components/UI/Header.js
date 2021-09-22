import React from 'react';

import classes from './Header.module.css';

const Header = ({ children }) => {
	return <header className={classes.unitHeader}>{children}</header>;
};

export default Header;
