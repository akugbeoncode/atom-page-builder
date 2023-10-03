import React, { useState, useEffect } from 'react'
import { IoMdAdd } from 'react-icons/io';
import ProjectsGrids from '../projects/ProjectsGrids';
import EmptyProjects from '../projects/EmptyProjects';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthData } from '../../auth/AuthWrapper';
import { fetchLoggedUserProjects } from '../../../apis/projects';

const Projects = () => {
	const { user, setProjectRef, isMobileScreenView } = AuthData();
	const [projects, setProjects] = useState([]);
	const navigate = useNavigate();
	const { projectRef } = useParams();

	const hostname = process.env.REACT_APP_ENV === "development" ? "localhost:5000" : "json-server-rbhf.onrender.com";
	const protocolType = process.env.REACT_APP_ENV === "development" ? "http" : "https";

	const getLoggedUserProjects = async () => {
		const userReference = user?.reference;
		const projectsFromServer = await fetchLoggedUserProjects(userReference);
		setProjects(projectsFromServer)
	}

	const deleteProject = async (id) => {
		await fetch(`${protocolType}://${hostname}/projects/${id}`, {
            method: "DELETE"
        })

        setProjects(projects.filter((project) => project.id !== id))
	}

	const updateProject = async (id, update) => {
		const res = await fetch(`${protocolType}://${hostname}/projects/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(update)
            })

            const data = await res.json()

            setProjects(
				projects.map((project) => project.id === id ? data : project )
			)
	}

	useEffect(() => {
    	setProjectRef(projectRef)
		getLoggedUserProjects()
	}, [])

	return (
		<div className={`container-fluid ${isMobileScreenView ? "px-1" : "px-3"}  py-3`}>
			<div className='row pb-1 border-bottom'>
				<div className='col-6 d-flex justify-content-start align-items-center'><h3 className='h3'>My Projects</h3></div>
				<div className='col-6 d-flex justify-content-end align-items-center pb-2'>
					<button 
						className='btn btn-primary fw-bold '
						onClick={(e)=>{
							e.stopPropagation()
							navigate('/create-project', {replace: true})
						}}
					>
					<IoMdAdd fontSize={isMobileScreenView ? 25 : 20} /> {isMobileScreenView ? "" : 'NEW PROJECT'}
				</button>
				</div>
			</div>
			<div className='row'>
				<div className='col-12'>
					{
						projects.length > 0 ?
						<ProjectsGrids projects={projects} user={user} deleteProject={deleteProject} updateProject={updateProject} /> :
						<EmptyProjects message={"You have NOT created any project yet!"} />
					}
				</div>
			</div>
		</div>	
	)
}

export default Projects
