export const capitalize = (word) => {
	if (!word) {
		return '';
	}
	const [first, ...rest] = word;
	return first.toUpperCase() + rest.join('').toLowerCase();
};
