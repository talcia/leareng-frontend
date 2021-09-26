import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeToDarkMode, changeToLightMode } from '../../store/theme-actions';
import ToggleButton from 'react-toggle-button';

import classes from './Settings.module.css';

const Settings = () => {
	const [darkModeIsOn, setDarkModeIsOn] = useState(false);
	const dispatch = useDispatch();
	const onDarkModeHandler = async () => {
		try {
			if (darkModeIsOn) {
				await dispatch(changeToLightMode());
			} else {
				await dispatch(changeToDarkMode());
			}
			setDarkModeIsOn((state) => !state);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className={classes.settings}>
			<h2>Settings</h2>
			<div className={classes.actions}>
				<p>{darkModeIsOn ? 'Light mode' : 'Dark Mode'}</p>
				<ToggleButton
					className={classes.toggleButton}
					inactiveLabel={''}
					activeLabel={''}
					colors={{
						activeThumb: {
							base: '#f16d21',
						},
						inactiveThumb: {
							base: '#f16d21',
						},
						active: {
							base: '#77777a',
							hover: '#aaaaaf',
						},
						inactive: {
							base: '#dfdfe9',
							hover: '#c8c8d3',
						},
					}}
					thumbAnimateRange={[0, 34]}
					value={darkModeIsOn}
					onToggle={onDarkModeHandler}
				/>
			</div>
		</div>
	);
};

export default Settings;
