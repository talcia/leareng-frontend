import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteUnit } from '../../../store/unit-actions';

import Modal from '../../UI/Modal';
import classes from './DeleteUnit.module.css';

const DeleteUnit = ({ onHideModal, unitId }) => {
	const token = useSelector((state) => state.auth.token);
	const dispatch = useDispatch();
	const history = useHistory();

	const deleteHandler = () => {
		dispatch(deleteUnit(unitId, token));
		history.push('/units');
	};

	const buttonProps = {
		button1: {
			text: 'Cancel',
			onClick: onHideModal,
			className: 'cancel',
		},
		button2: {
			text: 'Delete',
			onClick: deleteHandler,
		},
	};

	return (
		<Modal
			onHideModal={onHideModal}
			title={'Are you sure you want to remove this unit?'}
			text={"You'll lose all score and wrods collected in this unit"}
			button1={buttonProps.button1}
			button2={buttonProps.button2}
		></Modal>
	);
};

export default DeleteUnit;
