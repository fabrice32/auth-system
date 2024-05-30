import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	const validateForm = () => {
		const newErrors = {};
		if (!email) newErrors.email = "Email is required";
		else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
		if (!password) newErrors.password = "Password is required";
		else if (password.length < 8) newErrors.password = "Password must be at least 8 characters long";
		return newErrors;
	};

	const postLoginDetails = () => {
		fetch("http://localhost:4000/api/login", {
			method: "POST",
			body: JSON.stringify({ email, password }),
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error_message) {
					alert(data.error_message);
				} else {
					localStorage.setItem("username", data.data.username);
					navigate("/phone/verify");
				}
			})
			.catch((err) => console.error(err));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const formErrors = validateForm();
		if (Object.keys(formErrors).length === 0) {
			postLoginDetails();
			setPassword("");
			setEmail("");
		} else {
			setErrors(formErrors);
		}
	};

	const gotoSignUpPage = () => navigate("/register");

	return (
		<div className='login__container'>
			<h2>Login </h2>
			<form className='login__form' onSubmit={handleSubmit}>
				<label htmlFor='email'>Email</label>
				<input
					type='text'
					id='email'
					name='email'
					value={email}
					required
					onChange={(e) => setEmail(e.target.value)}
				/>
				{errors.email && <span className='error'>{errors.email}</span>}
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					name='password'
					id='password'
					minLength={8}
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				{errors.password && <span className='error'>{errors.password}</span>}
				<button className='loginBtn'>SIGN IN</button>
				<p>
					Don't have an account?{" "}
					<span className='link' onClick={gotoSignUpPage}>
						Sign up
					</span>
				</p>
			</form>
		</div>
	);
};

export default Login;
