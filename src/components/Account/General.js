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
import Avatar from '../UI/Avatar';

const General = ({ user, fetchUser }) => {
	const [editMode, setEditMode] = useState();
	const token = useSelector((state) => state.auth.token);
	const [userName, setUserName] = useState(user.name);
	const [userAvatarUrl, setUserAvatarUrl] = useState(user.avatarUrl);
	const isConfirmed = useSelector((state) => state.auth.isEmailConfirmed);

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

	const changeImage = async (e) => {
		const file = e.target.files[0];
		const url = `${process.env.REACT_APP_BACKENDURL}/users/${user._id}/avatar`;
		const formData = new FormData();
		formData.append('image', file, file.name);

		const response = await fetch(url, {
			method: 'PATCH',
			body: formData,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await response.json();

		setUserAvatarUrl(data.user.avatarUrl);
		fetchUser();
	};

	return (
		<div className={classes.general}>
			<h2>General info</h2>
			<div className={classes.info}>
				<div className={classes.avatar}>
					<Avatar avatarUrl={userAvatarUrl} />
					<label htmlFor="avatar">Upload Image</label>
					<input
						type="file"
						id="avatar"
						name="avatar"
						accept="image/png, image/jpeg, image/png"
						onChange={changeImage}
					/>
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
							{isConfirmed ? (
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
