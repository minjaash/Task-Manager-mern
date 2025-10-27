import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Edit = () => {
   const [editTask,setEditTask]=useState({})
    const {tid}=useParams();
    const Uri=process.env.REACT_APP_API_URL;
    const navigate=useNavigate();
  
    useEffect(()=>{
      axios.post(Uri+'/getEditTask',{tid})
      .then(dbres=>{
        setEditTask(dbres.data.dbres)
        console.log(dbres.data.dbres)

      })
      .catch(err=>{
        console.log('could not find the task to edit',err)
      })
    }
  ,[])

  const goBack=()=>{
            navigate(`/profile/userTasks/${editTask.sId}`);

  }


  const changeHandler=(event)=>{
   const{name,value}=event.target
// setEditTask(prev => ({ ...prev, [name]: value }));      
setEditTask({...editTask,[name]:value})
}

 const submitHandler = (event) => {
    event.preventDefault();
    if (editTask.task) {
      axios.put(Uri + "/updateTask", {editTask})
        .then(res => {
          console.log("task modified and saved", res);
          // Refetch all tasks after adding
          // return axios.post(Uri + "/userTasks", { sId: userData._id });
        navigate(`/profile/userTasks/${editTask.sId}`);

        })
        
        .catch(err => {
          console.log("error in saving or fetching tasks", err);
        });
    }
  };
  return (
    <div className='border border-2 m-3'>
            <h1>Edit the task</h1>
          <div className='d-flex flex-column container m-2'>
                <form onSubmit={submitHandler}>
                          <div className="input-group input-group-lg border ">

                                {/* <span className="input-group-text" id="inputGroup-sizing-lg"></span> */}
                                <input type="text" className="form-control me-3" name='task' value={editTask.task} onChange={changeHandler} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>
                                <button type='submit' className='btn btn-success'> update</button>
                          </div>
                </form>
        
        </div>
        <button className='btn btn-secondary' on onClick={()=>goBack()}> Go Back</button>
    </div>
  )
}

export default Edit