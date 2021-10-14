import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteUnit from './DeleteUnit';
import useCreator from '../../../hooks/use-creator';
import Heart from '../../UI/Heart';
import { sendRequest } from '../../../utils/sendRequest';

import classes from './UnitDetails.module.css';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Words from './Words/Words';
import Button from '../../UI/Button';

const UnitDetails = ({ unit }) => {
	const [deleteModalIsShown, setDeleteModalIsShown] = useState(false);
	const isCreator = useCreator(unit.creator);
	const token = useSelector((state) => state.auth.token);
	const history = useHistory();
	const [creator, setCreator] = useState({});
	const isConfirmed = useSelector((state) => state.auth.isEmailConfirmed);
	const [numberOfWords, setNumberOfWords] = useState(unit.words.length);

	const onClickHandler = () => {
		history.push(`/play/${unit._id}`);
	};

	useEffect(() => {
		async function fetchData() {
			const url = `${process.env.REACT_APP_BACKENDURL}/users/${unit.creator}`;
			const requestObject = {
				method: 'GET',
				token: token,
			};
			try {
				const data = await sendRequest(url, requestObject);
				const { avatarUrl, email, role, words, ...user } = data.user;
				setCreator(user);
			} catch (err) {
				console.log(err);
			}
		}
		fetchData();
	}, [token, unit.creator]);

	const showModalHanlder = () => {
		setDeleteModalIsShown(true);
	};

	const hideModalHanlder = () => {
		setDeleteModalIsShown(false);
	};

	const editHandler = () => {
		history.push(`/units/edit/${unit._id}`, { unit });
	};

	const updateNumberOfWords = (number) => {
		setNumberOfWords(number);
	};

	return (
		<div className={classes.wrapper}>
			{deleteModalIsShown ? (
				<DeleteUnit onHideModal={hideModalHanlder} unitId={unit._id} />
			) : null}
			<div className={classes.details}>
				<div className={classes.titles}>
					<div className={classes.title}>
						<h1>{unit.name}</h1>
					</div>
					<div className={classes.detail}>
						<Heart unit={unit} />
						<p>
							creator:{' '}
							<span
								onClick={() => {
									history.push(`/users/${creator._id}`);
								}}
							>
								{creator.name}
							</span>
						</p>
						<p>
							from <span>{unit.fromLang}</span> to{' '}
							<span>{unit.toLang}</span>
						</p>
					</div>
				</div>
				<div className={classes.actions}>
					{isCreator && (
						<div>
							<FontAwesomeIcon
								icon={faEdit}
								color={'var(--orange)'}
								onClick={editHandler}
							/>
							<FontAwesomeIcon
								icon={faTrash}
								color={'var(--orange)'}
								onClick={showModalHanlder}
							/>
						</div>
					)}
					<div className={classes.buttonPlay}>
						<Button
							text="Play"
							onClick={onClickHandler}
							disabled={numberOfWords === 0 || !isConfirmed}
						/>
					</div>
				</div>
			</div>
			<Words
				isCreator={isCreator}
				unit={unit}
				updateNumberOfWords={updateNumberOfWords}
			/>
		</div>
	);
};

export default UnitDetails;
