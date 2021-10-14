import React from 'react';

import classes from './Avatar.module.css';

const Avatar = ({ avatarUrl }) => {
	const style = avatarUrl && {
		backgroundImage: `url('https://leareng-bucket.s3.eu-west-1.amazonaws.com/images/${avatarUrl}')`,
	};
	return <div className={classes.avatar} style={{ ...style }}></div>;
};

export default Avatar;
