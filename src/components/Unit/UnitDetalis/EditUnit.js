import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editUnit } from '../../../store/unit-actions';
import Modal from '../../UI/Modal';
import AddUnit from '../AddUnit';

const EditUnit = ({ onHideModal, unit }) => {
	const token = useSelector((state) => state.auth.token);
	const dispatch = useDispatch();
	const history = useHistory();

	const editHandler = (unitData) => {
		const unitId = unit._id;
		dispatch(editUnit(unitId, unitData, token));
		history.push('/units');
	};

	return (
		<Modal onHideModal={onHideModal}>
			<AddUnit
				unit={unit}
				isEditMode={true}
				onHideModal={onHideModal}
				onEditClick={editHandler}
			/>
		</Modal>
	);
};

export default EditUnit;
