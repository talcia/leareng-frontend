import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faEdit,
	faCheckCircle,
	faTimesCircle,
} from '@fortawesome/free-regular-svg-icons';
import Input from '../../components/UI/Input';
import useInput from '../../hooks/use-input';
import { sendRequest } from '../../utils/sendRequest';

import classes from './General.module.css';
import { useSelector } from 'react-redux';

const General = ({ user, fetchUser }) => {
	const [editMode, setEditMode] = useState();
	const token = useSelector((state) => state.auth.token);
	const [userName, setUserName] = useState(user.name);

	const {
		value: enteredName,
		isValid: nameIsValid,
		hasError: nameHasError,
		reset: nameReset,
		valueChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
	} = useInput((value) => value.trim() !== '', user && user.name);

	const changeEditMode = () => {
		setEditMode((state) => !state);
	};

	const changeName = async (e, byClick = false) => {
		if (!nameIsValid) {
			return;
		}
		if (e.key === 'Enter' || byClick) {
			const url = `${process.env.REACT_APP_BACKENDURL}/users/${user._id}`;
			const userData = {
				name: enteredName,
			};
			const requestObject = {
				method: 'PATCH',
				token: token,
				data: userData,
			};

			const data = await sendRequest(url, requestObject);

			setUserName(data.user.name);
			fetchUser();

			changeEditMode();
		}
	};

	return (
		<div className={classes.general}>
			<h2>General info</h2>
			<div className={classes.info}>
				<div className={classes.avatar}>
					<div></div>
					<p>Upload Image</p>
				</div>

				{user && (
					<div className={classes.accountInfo}>
						<div className={classes.name}>
							{editMode ? (
								<>
									<Input
										type="text"
										id="name"
										placeholder="Name"
										value={enteredName}
										onChange={nameChangeHandler}
										onBlur={nameBlurHandler}
										hasError={nameHasError}
										onKeyDown={changeName}
									/>
									<FontAwesomeIcon
										icon={faCheckCircle}
										onClick={() => changeName({}, true)}
									/>
								</>
							) : (
								<>
									<div className={classes.userName}>
										<p>{userName}</p>
									</div>
									<FontAwesomeIcon
										icon={faEdit}
										onClick={changeEditMode}
									/>
								</>
							)}
						</div>
						<div className={classes.email}>
							<p>{user.email}</p>
							{user.active ? (
								<FontAwesomeIcon icon={faCheckCircle} />
							) : (
								<FontAwesomeIcon
									icon={faTimesCircle}
									className={classes.notConfirm}
								/>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default General;
