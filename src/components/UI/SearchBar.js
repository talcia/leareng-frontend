import React from 'react';
import Input from './Input';

import classes from './SearchBar.module.css';

const SearchBar = ({ onChange, placeholder, id, value }) => {
	return (
		<div className={classes.search}>
			<Input
				type="text"
				id={id}
				required={true}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};

export default SearchBar;
