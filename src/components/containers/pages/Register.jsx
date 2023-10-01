import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { SHA256 } from "crypto-js";

import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { AuthData } from '../../auth/AuthWrapper'
import Bars from 'react-loading-icons/dist/esm/components/bars';
import { useNavigate, useParams } from 'react-router-dom';

const Register = () => {
	const { projectRef } = useParams();
	const [loading, setLoading] = useState(false)
	const [userFullname, setUserFullname] = useState("")
	const [userEmail, setUserEmail] = useState("")
	const [userPassword, setUserPassword] = useState("")
	const [comfirmUserPassword, setComfirmUserPassword] = useState("")
	const { registerUser, responseFromGoogleHandled, setShowAlertMessage, setProjectRef, isMobileScreenView } = AuthData()

	const [nameError, setNameError] = useState({valid: false, message: ""})
	const [emailError, setEmailError] = useState({valid: false, message: ""})
	const [passwordError, setPasswordError] = useState({valid: false, message: ""})
	const [comfirmPasswordError, setComfirmPasswordError] = useState({valid: false, message: ""})

	const navigate = useNavigate();

	const handleResponseFromGoogle = async (response) => {
		setLoading(true)

		if (!response?.credential) {
			setLoading(false)
			return;
		}

		await responseFromGoogleHandled(response)
		setLoading(false)
		navigate('/dasboard', {replace: true});
	}

	const handleCreateAccountRequest = async () => {
		setLoading(true)
		if (nameError.valid && emailError.valid && passwordError.valid && comfirmPasswordError.valid) {
			const userData = {
				name: userFullname.toLowerCase(),
				email: userEmail.toLowerCase(),
				imageUrl: null,
				reference: uuidv4(),
				password: SHA256(userPassword).toString(),
				accountType: "Form Create User",
				createdAt: Date.now()
			}

			const data = await registerUser(userData)
			setLoading(false)
			setShowAlertMessage({active: true, code: data.code, status: data.status, message: data.message})
			if (data.code === 200) {
				navigate('/login', {replace: true});
			}
		} else {
			setLoading(false)
		}
	}
	

	const validateUserFullname = () => {
		let valid = true;
		let message = "";

		if (userFullname.length > 0 && userFullname.length < 6) {
			valid = false
			message = "Name is too short. Full name cannot contain less that 6 character"
		} 

		if (userFullname.length <= 0) valid = false;

		setNameError({valid, message})
	}

	const validateUserEmail = () => {
		let valid = true;
		let message = "";
		const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (userEmail.length > 0 && !regex.test(userEmail)) {
			valid = false
			message = "Invalid Email. expamle: johndoe@gmail.com"
		} 

		if (userEmail.length <= 0) valid = false;

		setEmailError({valid, message})
	}

	const validateUserPassword = () => {
		if (userPassword.length <= 0) return;
		let valid = true;
		let message = "";
		const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

		if (!regex.test(userPassword)) {
			valid = false
			message = "Invalid Password. Password MUST contain at least one upper case letter, at least one lower case letter, at  least one digit, at least one special character and a minimum eight charcters in length"
		} 
		setPasswordError({valid, message})
	}

	const validateComfirmPassword = () => {
		let valid = true
		let message = ""

		if (userEmail.length > 0 && (userPassword !== comfirmUserPassword)) {
			valid = false
			message = "Password Mismatch! Please ensure password and comfirm password matches."
		} 
		setComfirmPasswordError({valid, message})
	}

	const doNothing = () => {}

	useEffect(() => {
		validateUserFullname()
	}, [userFullname])

	useEffect(() => {
		validateUserEmail()
	}, [userEmail])

	useEffect(() => {
		validateUserPassword()
		validateComfirmPassword()
	}, [userPassword, comfirmUserPassword])

	useEffect(()=>{
		setProjectRef(projectRef)
	}, [])

    return (
		<div className='center-justified-layout'>
			<div className='auth-container'>
				<div className="container-fluid mt-5">
					<div className="row">
						<div className="col-md-8 offset-md-2">
							<div className="row shadow-md">
								<div className='col-md-6'>
									<h3 className="text-center">Create Account</h3>
									<form className='p-5'>
										<div className="mb-3">
											<label className="form-label">Full Name</label>
											<input type="text" className="form-control" value={userFullname} onChange={(e)=>setUserFullname(e.target.value)} required/>
											<div className="form-text text-danger">{nameError.message}</div>
										</div>
										<div className="mb-3">
											<label className="form-label">Email address</label>
											<input type="email" className="form-control"  value={userEmail} onChange={(e)=>setUserEmail(e.target.value)} required/>
											<div className="form-text text-danger">{emailError.message}</div>
										</div>
										<div className="mb-3">
											<label className="form-label">Password</label>
											<input type="password" className="form-control"  value={userPassword} onChange={(e)=>setUserPassword(e.target.value)} required/>
											<div className="form-text text-danger">{passwordError.message}</div>
										</div>
										<div className="mb-3">
											<label className="form-label">Comfirm Password</label>
											<input type="password" className="form-control"  value={comfirmUserPassword} onChange={(e)=>setComfirmUserPassword(e.target.value)} />
											<div className="form-text text-danger">{comfirmPasswordError.message}</div>
										</div>
										<div className="mb-5 text-center">
											{ loading ? 
												<button type="button" onClick={()=>doNothing()} className="btn btn-primary"><Bars height={25} width={35} /></button> :
												<button type="submit" onClick={(e) => {
													e.stopPropagation();
													handleCreateAccountRequest();
												}} className="btn btn-primary">Create Account</button>
											}
										</div>
									</form>
								</div>
								<div className={`col-md-6 social-media-signup ${isMobileScreenView ? "" : 'bg-light'}`} style={{ display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>
									<span className="h4 mb-5">Sign up using Social Media</span>
									{ loading ? 
										<button type="button" onClick={()=>doNothing()} className="btn btn-primary"><Bars height={25} width={35} /></button> :
										<GoogleOAuthProvider
											clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
										>
											<GoogleLogin 
												onSuccess={handleResponseFromGoogle}
												onError={handleResponseFromGoogle}
												state_cookie_domain="single_host_origin"
												/>
										</GoogleOAuthProvider>
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    )
}

export default Register
