import React from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { logoutUser } from '../../../store/auth-actions';

import classes from './MobileNavModal.module.css';

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

const MobileNavModal = ({ onHideModal }) => {
	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.auth.isAuthenticated);
	return (
		<>
			{createPortal(
				<Backdrop onHideModal={onHideModal} />,
				portalElements
			)}
			{createPortal(
				<ModalOverlay>
					{
						<div className={classes.mobileNav}>
							<Link to="/">
								<div className={classes.logo}>Leareng</div>
							</Link>

							<nav>
								<ul>
									{isAuth && (
										<>
											<li>
												<Link
													to="/units"
													onClick={() =>
														onHideModal()
													}
												>
													Units
												</Link>
											</li>
											<li>
												<Link
													to="/account/general"
													onClick={() =>
														onHideModal()
													}
												>
													Account
												</Link>
											</li>
											<li>
												<Link
													to="/auth/login"
													onClick={() => {
														dispatch(logoutUser());
														onHideModal();
													}}
												>
													Logout
												</Link>
											</li>
										</>
									)}
								</ul>
							</nav>
						</div>
					}
				</ModalOverlay>,
				portalElements
			)}
		</>
	);
};

export default MobileNavModal;
