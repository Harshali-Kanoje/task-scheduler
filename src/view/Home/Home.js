import React, { useEffect } from 'react'
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
  const [id ,setId] = useState(0)
  const [title , setTitle] = useState('');
  const [description , setDescription] = useState('');
  const [priority , setPriority] = useState('');
  const [isEdit ,setIsEdit] = useState(false);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('todo'))
    if(list && list.length > 0)
    {
      setTask(list)
    }
    
  },[])

  const saveTaskToLocalStorage = (newList) => {
    localStorage.setItem('todo' ,JSON.stringify(newList));
  }
  const addTaskToList = () => {
    // const randomId = Math.floor(Math.random)*1000;
    const randomId = Math.floor(Math.random() *1000);
    const obj = {
      id : randomId,
      title : title,
      description : description,
      priority : priority
    }
    const newList = [...task ,obj];
    setTask(newList)

    setTitle('');
    setDescription('');
    setPriority('');
    saveTaskToLocalStorage(newList);
    console.log(randomId)
  }

  const removeTaskFromList = (obj) => {
    const index = task.indexOf(obj)

    const temparray = task;
    temparray.splice(index,1)
    setTask([...temparray])
    saveTaskToLocalStorage([...temparray]);
  }

  const setTaskEditable = (id) => {
    setIsEdit(true)
    setId(id)

    let currentEditableTask;
    task.forEach((task) => {
      if(task.id===id){
        currentEditableTask = task;
      }
     
    })

    setTitle(currentEditableTask.title)
    setDescription(currentEditableTask.description)
    setPriority(currentEditableTask.priority)
  }

  const UpdateTask = () => {
    let indexToUpdate;
    task.forEach((task,i) => {
      if(task.id===id)
      {
        indexToUpdate = i
      }
    })

    const tempAarry = task;
    tempAarry[indexToUpdate] = {
      id : id,
      title : title,
      description: description,
      priority:priority
    }

    setTask([...tempAarry])

    saveTaskToLocalStorage(tempAarry)

    setId(-1)
    setIsEdit(false)
    
    setDescription('')
    setTitle('')
    setPriority('')
  }
  // const removeTaskFromList = (id) => {
  //   //  const index = task.indexOf(obj)
  //    let index;
  //    task.forEach((task,i) => {
  //     if(task.id === id)
  //      index = i;
  //    })
     
  //    const temparray = task;
  //    temparray.splice(index,1)
  //    setTask([...temparray])
  //   //  console.log(obj)
  // }

 
  // const isEdit = false;
  return (
    <div className='main-container'>
      <h1 className='todo-heading'>Task Scheduler</h1>
      <div className='task-todo'>
        <div>
          <h2 className='task-sub-heading'>Show Task</h2>
            {
                task.map((taskItem ,index) => {
                    const {id , title , description , priority} = taskItem;
                    return <Task id={id} title={title} description={description} priority={priority} removeTaskFromList ={removeTaskFromList} obj={taskItem} key={index} setTaskEditable={setTaskEditable}/>
                })
            }
         
        </div>
        <div className='input-container'>
        <h2 className='task-sub-heading'>{isEdit===true?`Update Task`:'Add Task'}</h2>
            <form>
              
              <input type='text' value={title} onChange={(e) => {
                    setTitle(e.target.value)
              }} className='tast-input' placeholder='Enter Your Title'/>
              <br/>
              <input type='text' value={description} onChange={(e) => {
                    setDescription(e.target.value)
              }} className='tast-input' placeholder='Enter Your Description'/>
              <br/>
              <input type='text' value={priority} onChange={(e) => {
                    setPriority(e.target.value)
              }} className='tast-input' placeholder='Enter Your Priority'/>
              <br/>
              {isEdit===true?<button type='button' onClick={UpdateTask}>Update</button>:<button type='button' onClick={addTaskToList}>Add To List</button>}
            </form>
        </div>
      </div>
    </div>
  )
}

export default Home
