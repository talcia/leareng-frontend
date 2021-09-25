import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeToDarkMode, changeToLightMode } from '../../store/theme-actions';

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
				<div>
					<p>
						Dark Mode{' '}
						<span onClick={onDarkModeHandler}>
							{darkModeIsOn ? 'off' : 'on'}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Settings;
