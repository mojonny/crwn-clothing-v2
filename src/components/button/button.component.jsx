import './button.styles.scss';
import React from 'react';

const BUTTON_TYPES_CLASSES = {
	google: 'google-sign-in',
	inverted: 'inverted',
};

export default function Button({ children, buttonType, ...otherProps }) {
	return (
		<button
			className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`}
			{...otherProps}
		>
			{children}
		</button>
	);
}
