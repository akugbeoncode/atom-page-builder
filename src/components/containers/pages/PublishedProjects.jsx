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
		<div style={{ width: "100%", height: "100%", overflowX: "hidden", overflowY: "scroll", paddingBottom: "200px" }}>
			<div className="container-fluid px-3 py-3">
				{
					projects.length > 0 ?
					<ProjectsGrids projects={projects} user={null} deleteProject={null} updateProject={null} /> :
					<EmptyProjects message={"No project record found!"} />
				}
			</div>	
		</div>
	)
}

export default PublishedProjects
