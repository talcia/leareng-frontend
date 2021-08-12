import React from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';

import classes from './Modal.module.css';

const Backdrop = (props) => {
	return <div className={classes.backdrop} onClick={props.onHideModal}></div>;
};

const ModalOverlay = (props) => {
	return (
		<div className={classes.modal}>
			<div className={classes.content}>{props.children}</div>
		</div>
	);
};

const portalElements = document.getElementById('overlays');

const Modal = ({ onHideModal, title, text, button1, button2, children }) => {
	return (
		<>
			{createPortal(
				<Backdrop onHideModal={onHideModal} />,
				portalElements
			)}
			{createPortal(
				<ModalOverlay>
					{children || (
						<div className={classes.delete}>
							<h2>{title}</h2>
							<p>{text}</p>
							<div className={classes.deleteActions}>
								{button1 && (
									<button
										onClick={button1.onClick}
										className={classes[button1.className]}
									>
										{button1.text}
									</button>
								)}
								{button2 && (
									<Button
										onClick={button2.onClick}
										text={button2.text}
									/>
								)}
							</div>
						</div>
					)}
				</ModalOverlay>,
				portalElements
			)}
		</>
	);
};

export default Modal;
