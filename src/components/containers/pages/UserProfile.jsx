import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { AuthData } from '../../auth/AuthWrapper';

const UserProfile = () => {
	const { projectRef } = useParams();
	const { setProjectRef } = AuthData()

	useEffect(()=>{
		setProjectRef(projectRef)
	}, [])

	return (
		<div className="p-5 mb-4 rounded-3">
			<div className="container-fluid py-5 d-flex flex-column justify-content-center align-items-center">
				<h1 className="display-5 fw-bold">Logged User Profile</h1>
				<p className="col-md-8 fs-4 text-center">Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to your liking.</p>
			</div>
		</div>
	)
}

export default UserProfile
