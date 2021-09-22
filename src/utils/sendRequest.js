export const sendRequest = async (url, requestObject, errorMessage) => {
	const response = await fetch(url, {
		method: requestObject.method,
		body: JSON.stringify(requestObject.data),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${requestObject.token}`,
		},
	});
	const data = await response.json();
	if (response.status !== 200 && response.status !== 201) {
		if (data.status !== 200 && data.status !== 201) {
			console.log('nie pasuje');
			if (data.status === 422 && errorMessage[data.status]) {
				throw new Error(errorMessage[data.status]);
			}
			if (data.status === 401 && errorMessage[data.status]) {
				throw new Error(errorMessage[data.status]);
			}
			if (data.status === 404 && errorMessage[data.status]) {
				throw new Error(errorMessage[data.status]);
			}
			throw new Error(data.data[0].msg);
		}
		throw new Error('Something went wrong');
	}

	return data;
};
