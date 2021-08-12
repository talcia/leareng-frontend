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
	if (data.status === 422) {
		throw new Error(errorMessage[data.status]);
	}
	if (data.status === 401) {
		throw new Error(errorMessage[data.status]);
	}
	if (response.status !== 200 && response.status !== 201) {
		throw new Error('Something went wrong');
	}
	return data;
};
