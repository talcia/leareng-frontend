import React from 'react';

import classes from './Avatar.module.css';

const Avatar = ({ avatarUrl }) => {
	return (
		<div
			className={classes.avatar}
			style={
				avatarUrl && {
					backgroundImage: `url('${process.env.REACT_APP_BACKENDURL}/${avatarUrl}')`,
				}
			}
		></div>
	);
};

export default Avatar;
