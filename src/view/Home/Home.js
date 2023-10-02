import React, { useEffect } from 'react'
import Task from '../../component/Task/Task'
import './Home.css'
import { useState } from 'react'
import showToast from 'crunchy-toast';
import { saveTaskToLocalStorage } from '../../util/utility';

const Home = () => {
  const [task , setTask] = useState([
    {
        id : '1',
        title : 'Assignment Completion',
        description : 'Otherwise not allow in the class',
        priority : 'Very High'
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
  // const readfromloacal=()=>{
  //   const list = JSON.parse(localStorage.getItem('todo'))
  //   if(list && list.length > 0)
  //   {
  //     setTask(list)
  //   } }

  
  const addTaskToList = () => {

    if(checkRequiredFileds() === false){
      return 
    }
    // if(!title)
    // {
    //   showToast('Title is required', 'warning', 3000);
    //   return
    // }

    // if(!description)
    // {
    //   showToast('Description is required', 'warning', 3000);
    //   return
    // }

    // if(!priority)
    // {
    //   showToast('Priority is required', 'warning', 3000);
    //   return
    // }
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

    setFieldClear()
    saveTaskToLocalStorage(newList);
  
    showToast('Task added successfully', 'success', 3000);
  }

  const removeTaskFromList = (obj) => {
    const index = task.indexOf(obj)

    const temparray = task;
    temparray.splice(index,1)
    setTask([...temparray])
    saveTaskToLocalStorage([...temparray]);
    showToast('Task remove successfully', 'alert', 6000);
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
    if(checkRequiredFileds() === false){
      return 
    }

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
    setFieldClear()
    showToast('Task updated successfully', 'info');
    // instead of doing this repetadly we can make a function for same task
    
  }

  const setFieldClear = () => {
    setDescription('')
    setTitle('')
    setPriority('')
  }

  const CancleUpdateTask = () => {
    setDescription('')
    setTitle('')
    setPriority('')
    setIsEdit(false)
    setId(null)
  }

  const checkRequiredFileds = () => {

    if(!title)
    {
      showToast('Title is required', 'warning', 3000);
      return false
    }

    if(!description)
    {
      showToast('Description is required', 'warning', 3000);
      return false
    }

    if(!priority)
    {
      showToast('Priority is required', 'warning', 3000);
      return false
    }
    return true
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
          <div className='task-list'>
          {
                task.map((taskItem ,index) => {
                    const {id , title , description , priority} = taskItem;
                    return <Task id={id} title={title} description={description} priority={priority} removeTaskFromList ={removeTaskFromList} obj={taskItem} key={index} setTaskEditable={setTaskEditable}/>
                })
            }
          </div>
            
         
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
              {isEdit ?<button type='button' onClick={UpdateTask}>Update</button>:<button type='button' onClick={addTaskToList}>Add To List</button>}
              {/* <button type='button' onClick={isEdit===true ? UpdateTask : addTaskToList}>{isEdit===true?Update:Add To List}</button> */}
              <button type='button' onClick={CancleUpdateTask}>Cancle</button>
            </form>
        </div>
      </div>
    </div>
  )
}
 
export default Home;
