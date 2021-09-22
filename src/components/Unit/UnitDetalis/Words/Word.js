import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import classes from './Word.module.css';

const Word = ({ index, word, isCreator, deleteWordHandler }) => {
	const deleteWord = async () => {
		await deleteWordHandler(word._id);
	};

	return (
		<tr className={classes.word}>
			<td>{index + 1}</td>
			<td>{word.word.join(', ')}</td>
			<td>{word.translation.join(', ')}</td>
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
