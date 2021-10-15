import React, { useState } from 'react';
import ResetPasswordForm from '../../components/Auth/ResetPasswordForm';
import ConfirmMessage from '../../components/Auth/ConfirmMessage';

const ResetPasswordPage = ({ token }) => {
	const [isEmailWasSent, setIsEmailWasSent] = useState(false);

	return isEmailWasSent ? (
		<ConfirmMessage
			setIsEmailWasSent={setIsEmailWasSent}
			title={'Your password was reset'}
			message={
				token
					? 'Now you need to use new password'
					: 'Now you can login to your account'
			}
			isButtonVisible={true}
			buttonLink={'/'}
			buttonText={'Back to home page'}
		/>
	) : (
		<ResetPasswordForm
			setIsEmailWasSent={setIsEmailWasSent}
			token={token}
		/>
	);
};

export default ResetPasswordPage;
