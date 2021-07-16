import React, { useState } from 'react';
import ConfirmMessage from '../../components/Auth/ConfirmMessage';
import SendConfirmEmailForm from '../../components/Auth/SendConfirmEmailForm';

const SendConfirmEmailPage = () => {
	const [isEmailWasSent, setIsEmailWasSent] = useState(false);

	return isEmailWasSent ? (
		<ConfirmMessage
			setIsEmailWasSent={setIsEmailWasSent}
			title={'Check your mail'}
			message={'We have sent a link to confirm email page to your email'}
			isButtonVisible={false}
			buttonLink={'/auth/login'}
			buttonText={'Back to login page'}
		/>
	) : (
		<SendConfirmEmailForm setIsEmailWasSent={setIsEmailWasSent} />
	);
};

export default SendConfirmEmailPage;
