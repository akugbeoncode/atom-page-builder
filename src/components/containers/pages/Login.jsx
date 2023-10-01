import React, { useEffect, useState } from 'react'
import { AuthData } from '../../auth/AuthWrapper'
import Bars from 'react-loading-icons/dist/esm/components/bars'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { useNavigate, useParams } from 'react-router-dom'

const Login = () => {
	const { projectRef } = useParams();
	const [loading, setLoading] = useState(false)
	const [userEmail, setUserEmail] = useState("")
	const [userPassword, setUserPassword] = useState("")
	const { login, responseFromGoogleHandled, setShowAlertMessage, setProjectRef, isMobileScreenView } = AuthData()

	const navigate = useNavigate();

	const handleAccountLoginRequest = async () => {
		setLoading(true)

		if (userEmail && userPassword) {
			const data = await login(userEmail, userPassword)
			setLoading(false)
			setShowAlertMessage({active: true, code: data.code, status: data.status, message: data.message})
			if (data.code === 200) {
				navigate('/dashboard', {replace: true});
			} 
		} else {
			setShowAlertMessage({active: true, code: 400, status: "failed", message: "Invalid email or password!"})
			setLoading(false)
		}
	}

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

	const doNothing = () => {}

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
							<h3 className="text-center">Login</h3>
							<form className='p-5'>
								<div className="mb-3">
									<label className="form-label">Email address</label>
									<input type="email" className="form-control"  value={userEmail} onChange={(e)=>setUserEmail(e.target.value)} required/>
								</div>
								<div className="mb-3">
									<label className="form-label">Password</label>
									<input type="password" className="form-control"  value={userPassword} onChange={(e)=>setUserPassword(e.target.value)} required/>
								</div>
								<div className="mb-5 text-center">
									{ loading ? 
										<button type="button" onClick={()=>doNothing()} className="btn btn-primary"><Bars height={25} width={35} /></button> :
										<button type="submit" onClick={(e) => {
											e.stopPropagation();
											handleAccountLoginRequest();
										}} className="btn btn-primary">Sign In</button>
									}
								</div>
							</form>
						</div>
						<div className={`col-md-6 social-media-signup ${isMobileScreenView ? "" : 'bg-light'}`} style={{ display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>
							<span className="h4 mb-5 text-center">Sign up using Social Media</span>
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

export default Login
