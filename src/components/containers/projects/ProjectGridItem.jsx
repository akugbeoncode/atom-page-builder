import React from 'react'
import { Link } from 'react-router-dom';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillEyeFill } from 'react-icons/bs';
import { BsFillEyeSlashFill } from 'react-icons/bs';

import Swal from 'sweetalert2';
import { capitalizeEachWord, capitalizeText } from '../../../helpers/utils';

const ProjectGridItem = ({ project, user, deleteProject, updateProject }) => {

    const publishedClassName = "badge text-bg-success";
    const notPublishedClassName = "badge text-bg-warning"

    const truncateText = (text) => {
        let maxLength = 230;  
        let truncatedText = text.length>maxLength ? text.substring(0, maxLength) + "..." : text;  
        return truncatedText;
    }

    const handleDeleteProjectRequest = () => {
        if (deleteProject) {
            Swal.fire({
                title: `Do you want to DELETE "${capitalizeEachWord(project.title)}" project?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Delete',
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    deleteProject(project.id, project.reference)
                } 
              })
        }
    }

    const handlePublishProjectRequest = () => {
        if (updateProject) {
            const publishStatus = !project.publish ? "PUBLISH" : "UNPUBLISH";
            Swal.fire({
                title: `Do you want to ${publishStatus} "${capitalizeEachWord(project.title)}" project?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: capitalizeText(publishStatus),
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                const projectUpdate = project;
                projectUpdate.publish = ! projectUpdate.publish;
                if (result.isConfirmed) {
                    updateProject(project.id, projectUpdate)
                } 
              })
        }
    }

    const canDeleteProject = () => {
        return user?.reference === project?.owner ? true : false;
    }

    const canPublishProject = () => {
        return user?.reference === project?.owner ? true : false;
    }

    return (
        <div className="feature col" style={{position: "relative"}}>
            <Link to={`/${project?.slug}`} className="no-link-underline">
                <div className="card" style={{height: "220px"}}>
                    <div className="card-body">
                        <h5 className="card-title text-capitalize">{ project.title }</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                            Published Status : &nbsp;
                            <span className={project?.publish ? publishedClassName : notPublishedClassName}>
                                {project?.publish ? "Published" : "Not Published"}
                            </span>
                        </h6>
                        
                        {
                            project?.description &&
                            <div className="mt-3">
                                <span className='fw-bold underline'>Description</span>
                                <p>
                                    {truncateText(project?.description)}
                                </p>
                            </div>
                        }
                        
                        {/* <Link to="/" className="card-link">Card link</Link>
                        <Link to="/" className="card-link">Another link</Link> */}
                    </div>
                </div>
            </Link>
            {
                canDeleteProject() &&
                <button className="btn btn-outline-danger" style={{position: "absolute", top: "15px", right: "20px"}}
                    onClick={handleDeleteProjectRequest}
                    title='Delete Project'
                >
                    <AiTwotoneDelete />
                </button>
            }

            {
                (canPublishProject() && project.publish) &&
                <button className="btn btn-outline-success" style={{position: "absolute", top: "15px", right: "70px"}}
                    onClick={handlePublishProjectRequest}
                    title='Unpublish Project'
                >
                    <BsFillEyeSlashFill />
                </button>
            }

            {
                (canPublishProject() && !project.publish) &&
                <button className="btn btn-outline-success" style={{position: "absolute", top: "15px", right: "70px"}}
                    onClick={handlePublishProjectRequest}
                    title='Publish Project'
                >
                    <BsFillEyeFill />
                </button>
            }
        </div>
    )
}

export default ProjectGridItem
