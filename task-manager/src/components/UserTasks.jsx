import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams,  useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks } from '../store/taskSlice';
import Delete from './Delete';

const UserTasks = () => {
  const Uri = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const { allTasks } = useSelector(state => state.tasks);
  const { sId } = useParams();
  const navigate=useNavigate()
  const [deleteTaskId,setDeleteTaskId]=useState(null)
  const {showTasks,hideTasks}=useOutletContext()
  

  useEffect(() => {
    axios.post(Uri + '/userTasks', { sId })
      .then(dbres => {
        console.log('userTasks fetched', dbres);
        dispatch(setTasks(dbres.data.dbres));
      })
      .catch(err => {
        console.log('could not fetch any tasks', err);
      });
  },[]);

  const editHandler=(tid)=>{
    navigate(`/profile/edit/${tid}`)
    
  }
  const deleteHandler=(tid,)=>{
    setDeleteTaskId(tid)
    
  }

  const handleCancel=()=>{
    setDeleteTaskId(null)
  }


  return (
    <div className='mt-2 border border-tertiary'>
      <h3 className='m-3 beta border border-round border-3 border-warning'>UserTasks</h3>
      <button className='btn btn-secondary m-2' onClick={()=>hideTasks()}>Hide Tasks</button>
      {allTasks.map((task, ind) => (
        <div>
                <div key={ind} className=" border border-2 border-tertiary bagd3 ">
                        <div className='d-flex justify-content-between'>
                                <div className='ms-1'>
                                      <span>
                                      {ind + 1}. 
                                      </span>
                                </div>
                                <p className='ms-5'> - {task.task}</p>
                                <div className='position absolute end-0'>
                                  <button className='btn btn-primary my-1 mx-1' onClick={()=>editHandler(task._id)}>Edit</button>
                                  <button className='btn btn-danger my-1 mx-1' onClick={()=>deleteHandler(task._id)}>Delete</button>
                                </div>
                        </div>
                        
                   {deleteTaskId===task._id && <Delete tid={task._id} sId={sId} onCancel={handleCancel}></Delete>}

                </div>
       </div>
      ))}
      
      
    </div>
  );
};

export default UserTasks;
