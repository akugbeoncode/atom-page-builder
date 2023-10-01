import React, { useEffect, useState } from 'react'
import ProjectsGrids from '../projects/ProjectsGrids'
import EmptyProjects from '../projects/EmptyProjects'
import { fetchPublishedProjects } from '../../../apis/projects';
import { useParams } from 'react-router-dom';
import { AuthData } from '../../auth/AuthWrapper';

const PublishedProjects = () => {
  	const [projects, setProjects] = useState([]);
	const { projectRef } = useParams();
	const { setProjectRef } = AuthData()

	const getPublishedProjects = async () => {
		const projectsFromServer = await fetchPublishedProjects();
		setProjects(projectsFromServer)
	}

	useEffect(() => {
		setProjectRef(projectRef)
		getPublishedProjects()
	}, [])

	return (
		<div className="container-fluid px-5 py-5">
			{
				projects.length > 0 ?
				<ProjectsGrids projects={projects} user={null} deleteProject={null} updateProject={null} /> :
				<EmptyProjects message={"No project record found!"} />
			}
		</div>	
	)
}

export default PublishedProjects
