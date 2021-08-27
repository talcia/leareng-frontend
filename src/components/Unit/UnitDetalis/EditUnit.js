import React from 'react';
import { useLocation } from 'react-router-dom';

import AddUnitForm from '../../UI/Unit/AddUnitForm';

const EditUnit = () => {
	const { state } = useLocation();
	const { unit } = state;

	return (
		<AddUnitForm
			title="Edit exist unit"
			buttonText="Edit unit"
			isEditMode={true}
			unit={unit}
		/>
	);
};

export default EditUnit;
