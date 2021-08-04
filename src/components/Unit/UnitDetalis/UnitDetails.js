import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import classes from './UnitDetails.module.css';
import DeleteUnit from './DeleteUnit';

const UnitDetails = ({ unit }) => {
	const [modalIsShown, setModalIsShown] = useState(false);

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
							<span>
								<FontAwesomeIcon
									icon={faHeart}
									color={'var(--orange)'}
								/>{' '}
								{unit.popularity}
							</span>
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
				</div>
			</div>

			<div className={classes.words}></div>
		</div>
	);
};

export default UnitDetails;
