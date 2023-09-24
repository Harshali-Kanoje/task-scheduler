import React from 'react'
import './Task.css'

const Task = ({id , title , description , priority , removeTaskFromList ,obj , setTaskEditable}) => {
  return (
    <div className='task-container'>
      <h1>{title}</h1>
      <h2>{description}</h2>
      <span className='task-priority'>{priority}</span>
      <span className='delete-btn' onClick={() => {
        removeTaskFromList(obj)
        // console.log(obj)
      }}>❌ </span>
      <span className='edit-btn' onClick={() => {
        setTaskEditable(id)
        // console.log(obj)
      }}>🖋️</span>
    </div>
  )
}

export default Task
