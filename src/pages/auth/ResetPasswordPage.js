import React, { useState } from 'react';
import ResetPasswordForm from '../../components/Auth/ResetPasswordForm';
import ConfirmMessage from '../../components/Auth/ConfirmMessage';

const ResetPasswordPage = () => {
	const [isEmailWasSent, setIsEmailWasSent] = useState(false);

	return isEmailWasSent ? (
		<ConfirmMessage
			setIsEmailWasSent={setIsEmailWasSent}
			title={'Your password was reset'}
			message={'Now you can login to your account'}
			isButtonVisible={true}
			buttonLink={'/auth/login'}
			buttonText={'Back to login page'}
		/>
	) : (
		<ResetPasswordForm setIsEmailWasSent={setIsEmailWasSent} />
	);
};

export default ResetPasswordPage;
