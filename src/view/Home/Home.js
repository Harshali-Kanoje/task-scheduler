import React from 'react'
import Task from '../../component/Task/Task'
import './Home.css'
import { useState } from 'react'

const Home = () => {
  const [task , setTask] = useState([
    {
        id : '1',
        title : 'Assignment Completion',
        description : 'Otherwise not allow in the class',
        priority : 'Very High'
    },
    {
        id : '2',
        title : 'WakeUp at 6am',
        description : 'Otherwise class will be missing',
        priority : 'Very High'
    },
    {
        id : '3',
        title : 'Going outside',
        description : 'Enjoy and feel better',
        priority : 'low'
    },
    {
        id : '4',
        title : 'Eating Food',
        description : 'For better health',
        priority : 'High'
    }
  ])
  return (
    <div className='main-container'>
      <h1> ToDo List App</h1>
      <div className='task-todo'>
        <div>
            {
                task.map((taskItem) => {
                    const {id , title , description , priority} = taskItem;
                    return <Task id={id} title={title} description={description} priority={priority}/>
                })
            }
         
        </div>
        <div>
            Add list
        </div>
      </div>
    </div>
  )
}

export default Home
