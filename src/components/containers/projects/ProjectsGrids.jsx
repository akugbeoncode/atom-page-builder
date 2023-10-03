import React from 'react'
import ProjectGridItem from './ProjectGridItem'

const ProjectsGrids = ({ projects, user, deleteProject, updateProject }) => {
  return (
    <div className="row g-4 py-3 row-cols-1 row-cols-lg-3">
        {
            projects?.map(project=>(
                <ProjectGridItem key={project.reference} project={project} user={user} deleteProject={deleteProject} updateProject={updateProject} />
            ))
        }
    </div>
  )
}

export default ProjectsGrids
