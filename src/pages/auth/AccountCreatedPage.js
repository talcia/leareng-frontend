import React from 'react';

import ConfirmMessage from '../../components/Auth/ConfirmMessage';

const AccountCreatedPage = () => {
	return (
		<ConfirmMessage
			title={'Account created'}
			message={
				'Congratulations! Your account has been succesfully created. Now you can login'
			}
			isButtonVisible={true}
			buttonLink={'/auth/login'}
			buttonText={'Login'}
		/>
	);
};

export default AccountCreatedPage;
