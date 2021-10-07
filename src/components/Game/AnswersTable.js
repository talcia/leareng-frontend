import React from 'react';

import classes from './AnswersTable.module.css';

const AnswersTable = ({ ratedAnswers, reverse }) => {
	return (
		<div className={classes.translation}>
			<table>
				<tbody className={classes.title}>
					<tr>
						<td>Question</td>
						<td>Your translation</td>
						<td>Correct translation</td>
					</tr>
				</tbody>
				<tbody className={classes.words}>
					{ratedAnswers.map((item) => (
						<tr key={item._id}>
							<td>
								{reverse
									? item.translation.join(', ')
									: item.word.join(', ')}
							</td>
							<td
								className={
									item.correct ? classes.good : classes.bad
								}
							>
								{item.answer}
							</td>
							<td className={!item.correct ? classes.good : ''}>
								{reverse
									? item.word.join(', ')
									: item.translation.join(', ')}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default AnswersTable;
