import React, { useState, useEffect } from 'react'
import Bars from 'react-loading-icons/dist/esm/components/bars'
import { v4 as uuidv4 } from 'uuid';
import { fetchUserByProps } from '../../../apis/users'
import { createIfProjectDoesNot, fetchProjectByProps } from '../../../apis/projects'
import { slugify } from '../../../helpers/utils'
import { AuthData } from '../../auth/AuthWrapper';
import { useNavigate, useParams } from 'react-router-dom';

const CreateProject = () => {
	const { projectRef } = useParams();
	const [loading, setLoading] = useState(false)
	const [title, setTitle] = useState("")
	const [titleIsAvailable, setTitleIsAvailable] = useState(false)
	const [availableMessage, setAvailableMessage] = useState("")
	const [availableClassName, setAvailableClassName] = useState("form-text text-success")
	const [slug, setSlug] = useState("")
	const [description, setDescription] = useState("")

	const { user, setShowAlertMessage, setProjectRef } = AuthData();
	const navigate = useNavigate();


	const doNothing = () => {

	}

	const handleCreateProjectRequest = async () => {
		setLoading(true)

		if (!titleIsAvailable) {
			setLoading(false)
        	return null
		}

		const projectObj = {
			title: title?.toLowerCase().trim(),
			slug: slug,
			description: description,
			reference: uuidv4(),
			owner: user.reference,
			publish: false
		  }
	
		  const data = await createIfProjectDoesNot(projectObj);
		  setLoading(false)
		  setShowAlertMessage({active: true, code: data.code, status: data.status, message: data.message})
		  if ((data.code >= 200) && (data.code < 300)) {
			navigate('/my-projects', {replace: true})
		  }
	}

	const slugifyProjectTitle = (text) => {
		return slugify(text)
	}

	const getProjectByTitle = async (projectSlug) => {
		const prop = "slug";
		const projectFromServer = await fetchProjectByProps(prop, projectSlug);
		return projectFromServer;
	}

	const updateTitleParams = async (text) => {
		const projectFromServer = await getProjectByTitle(text);
		if (projectFromServer) {
			setTitleIsAvailable(false);
			setAvailableMessage("Title is NOT available")
			setAvailableClassName("form-text text-danger")
		} else {
			setTitleIsAvailable(true);
			setAvailableMessage("Title is available")
			setAvailableClassName("form-text text-success")
		}
		

		if (text.length <= 0) {
			setAvailableMessage("")
			setTitleIsAvailable(false);
		}
	}
	
	const handleTitleChangeRequest = (e) => {
		const temp = slugifyProjectTitle(e.target.value)
		setTitle(e.target.value.toLowerCase())
		setSlug(temp)
		updateTitleParams(temp)
	}

	useEffect(()=>{
        setProjectRef(projectRef)
	}, [])

	return (
		<div className="container-fluid mt-5">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<div className="row shadow-md">
						<div className='col-md-12'>
							<h3 className="text-center">Create New Project</h3>
							<form className='p-5' onSubmit={(e)=>e.stopPropagation()}>
								<div className="mb-3">
									<label className="form-label">Title</label>
									<input type="text" className="form-control"  value={title} onChange={(e)=>handleTitleChangeRequest(e)} required/>
									<div className={availableClassName}>{availableMessage}</div>
								</div>
								<div className="mb-3">
									<label className="form-label">Slug</label>
									<input type="text" className="form-control"  value={slug} onChange={(e)=>setSlug(e.target.value)} readOnly/>
								</div>
								<div className="mb-3">
									<label className="form-label">Description</label>
									<textarea className="form-control" height={200} value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
								</div>
								<div className="mb-5 text-center">
									{ loading ? 
										<button type="button" onClick={()=>doNothing()} className="btn btn-primary"><Bars height={25} width={35} /></button> :
										<button type="submit" onClick={(e) => {
											e.stopPropagation();
											handleCreateProjectRequest();
										}} className="btn btn-primary">Create Project</button>
									}
								</div>
							</form>
						</div>
					</div>
				</div>
        	</div>
        </div>
	)
}

export default CreateProject
