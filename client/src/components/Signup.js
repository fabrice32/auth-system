import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [tel, setTel] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	const validateForm = () => {
		const newErrors = {};
		if (!email) newErrors.email = "Email is required";
		else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
		if (!username) newErrors.username = "Username is required";
		if (!tel) newErrors.tel = "Phone number is required";
		else if (!/^\+?[0-9]{10,15}$/.test(tel)) newErrors.tel = "Phone number is invalid";
		if (!password) newErrors.password = "Password is required";
		else if (password.length < 8) newErrors.password = "Password must be at least 8 characters long";
		return newErrors;
	};

	const postSignUpDetails = () => {
		fetch("http://localhost:4000/api/register", {
			method: "POST",
			body: JSON.stringify({ email, password, tel, username }),
			headers: { "Content-Type": "application/json" },
		})
		
		.then((res) => res.json())
		.then((data) => {
			if (data.error_message) {
				alert(data.error_message);
			} else {
				alert("Account created successfully!");
				navigate("/");
			}
		})
		.catch((err) => console.error(err));
};

const handleSubmit = (e) => {
	e.preventDefault();
	const formErrors = validateForm();
	if (Object.keys(formErrors).length === 0) {
		postSignUpDetails();
		setEmail("");
		setTel("");
		setUsername("");
		setPassword("");
	} else {
		setErrors(formErrors);
	}
};
const gotoLoginPage = () => navigate("/");

return (
	<div className='signup__container'>
		<h2>Sign up </h2>
		<form className='signup__form' onSubmit={handleSubmit}>
			<label htmlFor='email'>Email Address</label>
			<input
				type='email'
				name='email'
				id='email'
				value={email}
				required
				onChange={(e) => setEmail(e.target.value)}
			/>
			{errors.email && <span className='error'>{errors.email}</span>}
			<label htmlFor='username'>Username</label>
			<input
				type='text'
				id='username'
				name='username'
				value={username}
				required
				onChange={(e) => setUsername(e.target.value)}
			/>
			{errors.username && <span className='error'>{errors.username}</span>}
			<label htmlFor='tel'>Phone Number</label>
			<input
				type='tel'
				name='tel'
				id='tel'
				value={tel}
				required
				onChange={(e) => setTel(e.target.value)}
			/>
			{errors.tel && <span className='error'>{errors.tel}</span>}
			<label htmlFor='tel'>Password</label>
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
			<button className='signupBtn'>SIGN UP</button>
			<p>
				Already have an account?{" "}
				<span className='link' onClick={gotoLoginPage}>
					Login
				</span>
			</p>
		</form>
	</div>
);
};

export default Signup;
