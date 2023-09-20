import React from 'react'
import './Task.css'

const Task = ({id , title , description , priority}) => {
  return (
    <div className='task-container'>
      <h1>{title}</h1>
      <h2>{description}</h2>
      <span>{priority}</span>
    </div>
  )
}

export default Task
