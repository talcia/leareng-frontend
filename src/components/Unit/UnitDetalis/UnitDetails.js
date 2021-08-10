import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteUnit from './DeleteUnit';
import useCreator from '../../../hooks/use-creator';
import Heart from '../../UI/Heart';

import classes from './UnitDetails.module.css';

const UnitDetails = ({ unit }) => {
	const [modalIsShown, setModalIsShown] = useState(false);
	const isCreator = useCreator(unit.creator);

	const editHandler = () => {
		console.log('tak');
	};

	const showModalHanlder = () => {
		setModalIsShown(true);
	};

	const hideModalHanlder = () => {
		setModalIsShown(false);
	};

	return (
		<div className={classes.wrapper}>
			{modalIsShown ? (
				<DeleteUnit onHideModal={hideModalHanlder} unitId={unit._id} />
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
								onClick={editHandler}
							/>
							<FontAwesomeIcon
								icon={faTrash}
								color={'var(--orange)'}
								size={'1.5x'}
								onClick={showModalHanlder}
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
