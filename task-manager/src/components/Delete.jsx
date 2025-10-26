import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setTasks } from '../store/taskSlice'

const Delete = ({tid,onCancel,sId}) => {
  
  const dispatch=useDispatch()
 const Uri='http://localhost:4000'

const deleteTaskHandler=()=>{
  axios.delete(Uri+"/deleteTask",{
    data:{tid}
  })
  .then(res=>{
    console.log('task deleted',res)
    return axios.post(Uri + "/userTasks", { sId: sId })
  })
  .then(dbres=>{
      dispatch(setTasks(dbres.data.dbres))
  })
  .catch(err=>{
    console.log("err in deleting the task",err)
  })
}

  return (
    <div>
    <p className='bg-danger'>Are you sure you want to delete this task?</p>
    <button className='btn btn-secondary me-3' onClick={onCancel}> cancel</button>
    <button className='btn btn-danger' onClick={deleteTaskHandler}> delete</button>

    </div>
  )
}

export default Delete