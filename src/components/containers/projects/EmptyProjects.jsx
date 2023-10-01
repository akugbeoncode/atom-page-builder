import React from 'react'

const EmptyProjects = ({ message}) => {
  return (
    <div className="p-5 mb-4 rounded-3">
      <div className="container-fluid py-5 d-flex flex-column justify-content-center align-items-center">
        <h1 className="h2 fw-bold text-secondary text-center">{message}</h1>
      </div>
    </div>
  )
}

export default EmptyProjects
