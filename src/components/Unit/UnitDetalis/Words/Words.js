import React, { useEffect, useState } from 'react';
import ErrorText from '../../../UI/ErrorText';

import classes from './Words.module.css';
import { addWord, deleteWord } from '../../../../store/unit-actions';
import { useDispatch, useSelector } from 'react-redux';

import { sendRequest } from '../../../../utils/sendRequest';
import Word from './Word';
import AddWordForm from './AddWordForm';

const Words = ({ isCreator, unit }) => {
	const [formError, setFormError] = useState(null);
	const [words, setWords] = useState([]);
	const token = useSelector((state) => state.auth.token);
	const dispatch = useDispatch();

	const { fromLang, toLang, _id: unitId } = unit;

	useEffect(() => {
		async function fetchData() {
			const url = `${process.env.REACT_APP_BACKENDURL}/units/${unitId}/words`;
			const requestObject = {
				method: 'GET',
				token: token,
			};

			const data = await sendRequest(url, requestObject);
			const words = [];
			for (let word of data.words) {
				const {
					createdAt,
					creator,
					difficulty,
					unit,
					updatedAt,
					__v,
					...shortWord
				} = word;

				words.push(shortWord);
			}
			setWords(words);
		}
		fetchData();
	}, [token, unitId]);

	const addWordHandler = async (e, wordData) => {
		e.preventDefault();
		try {
			const word = await dispatch(addWord(unitId, wordData, token));
			const wordsList = [...words];
			const {
				createdAt,
				creator,
				difficulty,
				unit,
				updatedAt,
				__v,
				...shortWord
			} = word;
			console.log(word);
			wordsList.unshift(shortWord);
			setWords(wordsList);
		} catch (err) {
			setFormError(err.message);
		}
	};

	const deleteWordHandler = async (wordId) => {
		try {
			await dispatch(deleteWord(unitId, wordId, token));
			let wordsList = [...words];
			wordsList = wordsList.filter((word) => word._id !== wordId);
			console.log(wordsList);
			setWords(wordsList);
		} catch (err) {
			setFormError(err.message);
		}
	};

	return (
		<div className={classes.words}>
			{formError && <ErrorText text={formError} />}
			<table className={classes.title}>
				<tbody>
					<tr>
						<td>No</td>
						<td>Word</td>
						<td>Translation</td>
					</tr>
				</tbody>
			</table>
			{isCreator && (
				<AddWordForm
					fromLang={fromLang}
					toLang={toLang}
					unitId={unitId}
					setFormError={setFormError}
					addWordHandler={addWordHandler}
				/>
			)}

			<table>
				<tbody>
					{words.length ? (
						words.map((word, index) => (
							<Word
								index={index}
								word={word}
								isCreator={isCreator}
								deleteWordHandler={deleteWordHandler}
								key={word._id}
							/>
						))
					) : (
						<tr>
							<td>No words yet</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default Words;
