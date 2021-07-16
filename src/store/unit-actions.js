export const addUnit = (unitData, token) => {
	return async () => {
		try {
			const url = `https://leareng.herokuapp.com/units`;
			const data = await sendRequest(url, {
				method: 'POST',
				data: unitData,
				token,
			});
			console.log(data);
		} catch (err) {
			throw err;
		}
	};
};

const sendRequest = async (url, requestObject) => {
	console.log(requestObject.token);
	const response = await fetch(url, {
		method: requestObject.method,
		body: JSON.stringify(requestObject.data),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${requestObject.token}`,
		},
	});
	const data = await response.json();
	if (data.status === 422) {
		throw new Error('Provided email or password is invalid');
	}
	if (data.status === 401) {
		throw new Error(
			'Please confirm your email address if you want to add units'
		);
	}
	if (response.status !== 200 && response.status !== 201) {
		throw new Error('Something went wrong');
	}
	return data;
};
