import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Units from '../UI/Unit/Units';
import LoggedStarting from './LoggedStarting';
import UnloggedStarting from './UnloggedStarting';

const StartingPageContent = () => {
	const isAuth = useSelector((state) => state.auth.isAuthenticated);

	return <>{isAuth ? <LoggedStarting /> : <UnloggedStarting />}</>;
};

export default StartingPageContent;
