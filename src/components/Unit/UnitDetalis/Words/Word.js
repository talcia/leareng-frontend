import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import classes from './Words.module.css';

const Word = ({ word, isCreator, deleteWordHandler }) => {
	const deleteWord = async () => {
		await deleteWordHandler(word._id);
	};

	return (
		<tr>
			<td></td>
			<td>{word.word}</td>
			<td>{word.translation}</td>
			{isCreator && (
				<td>
					<FontAwesomeIcon
						icon={faTrash}
						color={'var(--orange)'}
						onClick={deleteWord}
					/>
				</td>
			)}
		</tr>
	);
};

export default Word;
