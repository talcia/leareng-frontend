import React, { useState } from 'react';
import ForgotPasswordForm from '../../components/Auth/ForgotPasswordForm';
import ConfirmMessage from '../../components/Auth/ConfirmMessage';

const ForgotPasswordPage = () => {
	const [isEmailWasSent, setIsEmailWasSent] = useState(false);

	return isEmailWasSent ? (
		<ConfirmMessage
			setIsEmailWasSent={setIsEmailWasSent}
			title={'Check your mail'}
			message={
				'We have sent a password recover instructions to your email '
			}
			isButtonVisible={true}
			buttonLink={'/auth/login'}
			buttonText={'Back to login page'}
		/>
	) : (
		<ForgotPasswordForm setIsEmailWasSent={setIsEmailWasSent} />
	);
};

export default ForgotPasswordPage;
