import React from 'react';

import AddUnitForm from '../UI/Unit/AddUnitForm';

const AddUnit = () => {
	return (
		<AddUnitForm
			title="Create new unit"
			buttonText="Add unit"
			isEditMode={false}
		/>
	);
};

export default AddUnit;
