import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import MobileNavModal from './MobileNavModal/MobileNavModal';
import { useSelector } from 'react-redux';

import classes from './MobileNavigation.module.css';

const MobileNavigation = () => {
	const [navModalIsShown, setNavModalIsShown] = useState(false);
	const isAuth = useSelector((state) => state.auth.isAuthenticated);

	const showModalHanlder = () => {
		setNavModalIsShown(true);
	};

	const hideModalHanlder = () => {
		setNavModalIsShown(false);
	};

	return (
		<div className={classes.header}>
			<Link to="/">
				<div className={classes.logo}>Leareng</div>
			</Link>
			{isAuth ? (
				<FontAwesomeIcon icon={faBars} onClick={showModalHanlder} />
			) : (
				<Link to="/auth/login" onClick={() => hideModalHanlder()}>
					Login
				</Link>
			)}
			{navModalIsShown && (
				<MobileNavModal onHideModal={hideModalHanlder}>
					<div className={classes.nav}>Hello</div>
				</MobileNavModal>
			)}
		</div>
	);
};

export default MobileNavigation;
