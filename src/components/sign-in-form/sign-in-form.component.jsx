import React, { useContext } from 'react';
import Button from '../button/button.component';
import { useState } from 'react';
import FormInput from '../form-input/form-input.components';
import './sign-in-form.styles.scss';
import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
	signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';
import { UserContext } from '../contexts/user.context';

const defaultFormFields = {
	email: '',
	password: '',
};

export default function SignInForm() {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const { setCurrentUser } = useContext(UserContext);

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const signInWithGoogle = async () => {
		const { user } = await signInWithGooglePopup();
		await createUserDocumentFromAuth(user);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const { user } = await signInAuthUserWithEmailAndPassword(
				email,
				password
			);
			setCurrentUser(user);

			resetFormFields(defaultFormFields);
		} catch (error) {
			switch (error.code) {
				case 'auth/wrong-password':
					alert('incorrect pw for email');
					break;

				case 'auth/user-not-found':
					alert('incorrect email!');
					break;
				default:
					console.log(error);
			}
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className="sign-in-container">
			<h2>I already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Email"
					type="email"
					required
					onChange={handleChange}
					name="email"
					value={email}
				/>

				<FormInput
					label="Password"
					type="password"
					required
					onChange={handleChange}
					name="password"
					value={password}
				/>

				<div className="buttons-container">
					<Button type="button" buttonType="google" onClick={signInWithGoogle}>
						Google sign in
					</Button>

					<Button type="submit">Sign in</Button>
				</div>
			</form>
			<br />
		</div>
	);
}
