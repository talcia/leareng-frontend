import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ApplyTheme = ({ children }) => {
	const theme = useSelector((state) => state.theme.theme);
	const updateCSSVariables = (theme) => {
		const arrayOfVariableKeys = Object.keys(theme);
		const arrayOfVariableValues = Object.values(theme);

		arrayOfVariableKeys.forEach((cssVariableKey, index) => {
			document.documentElement.style.setProperty(
				cssVariableKey,
				arrayOfVariableValues[index]
			);
		});
	};

	useEffect(() => {
		updateCSSVariables(theme);
	}, [theme]);

	return <>{children}</>;
};

export default ApplyTheme;
