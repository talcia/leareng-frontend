import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteUnit from './DeleteUnit';
import EditUnit from './EditUnit';
import useCreator from '../../../hooks/use-creator';
import Heart from '../../UI/Heart';

import classes from './UnitDetails.module.css';
import { useHistory } from 'react-router-dom';

const UnitDetails = ({ unit }) => {
	const [deleteModalIsShown, setDeleteModalIsShown] = useState(false);
	const [editModalIsShown, setEditModalIsShown] = useState(false);
	const isCreator = useCreator(unit.creator);
	const history = useHistory();

	const editHandler = () => {
		history.push(`/units/edit/${unit._id}`);
	};

	const showModalHanlder = (isDeleteModal) => {
		isDeleteModal ? setDeleteModalIsShown(true) : setEditModalIsShown(true);
	};

	const hideModalHanlder = (isDeleteModal) => {
		isDeleteModal
			? setDeleteModalIsShown(false)
			: setEditModalIsShown(false);
	};

	return (
		<div className={classes.wrapper}>
			{deleteModalIsShown ? (
				<DeleteUnit
					onHideModal={() => {
						hideModalHanlder(true);
					}}
					unitId={unit._id}
				/>
			) : null}
			{editModalIsShown ? (
				<EditUnit
					onHideModal={() => {
						hideModalHanlder(false);
					}}
					unit={unit}
				/>
			) : null}
			<div className={classes.details}>
				<div className={classes.titles}>
					<div className={classes.title}>
						<h1>{unit.name}</h1>
						<p>
							<Heart unit={unit} />
						</p>
					</div>
					<div className={classes.detail}>
						<p>
							creator: <span>{unit.creator}</span>
						</p>
						<p>
							from <span>{unit.fromLang}</span> to{' '}
							<span>{unit.toLang}</span>
						</p>
					</div>
				</div>
				<div className={classes.actions}>
					{isCreator && (
						<>
							<FontAwesomeIcon
								icon={faEdit}
								color={'var(--orange)'}
								size={'1x'}
								onClick={() => {
									showModalHanlder(false);
								}}
							/>
							<FontAwesomeIcon
								icon={faTrash}
								color={'var(--orange)'}
								size={'1.5x'}
								onClick={() => {
									showModalHanlder(true);
								}}
							/>
						</>
					)}
				</div>
			</div>

			<div className={classes.words}></div>
		</div>
	);
};

export default UnitDetails;
