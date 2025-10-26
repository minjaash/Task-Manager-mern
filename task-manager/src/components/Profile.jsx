import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { setTasks } from '../store/taskSlice'



const Profile = ({setIsLoggedIn}) => {
 const Uri='http://localhost:4000'
  const navigate=useNavigate();
  const dispatch=useDispatch();
 const [userData,setUserData]=useState("")
 const [task,setTask]=useState("")
 const[showTasks,setShowTasks]=useState(false)
  useEffect(()=>{
    const token=localStorage.getItem('user')
   if (!token || token === "undefined") {
      navigate('/')
    }
    axios({
      method:'post',
      url:Uri+"/user",
      headers:{
        Authorization:"Bearer "+token
      }
    })
    .then(dbres=>{
      console.log(dbres)
      setUserData(dbres.data.dbres)
      
    })
    .catch(err=>{
      console.log("user does not exist",err)
      navigate("/")
    })
    },[])
  
  const handleLogout = () => {
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      navigate('/');
    };

   const changeHandler=(event)=>{
      event.preventDefault()
     const{name,value}=event.target
      setTask(value)
        
  }

  const showTasksHandler=()=>{
    setShowTasks(!showTasks)
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (task) {
      axios.post(Uri + "/addTask", { task, sId: userData._id })
        .then(res => {
          console.log("task saved", res);
          // Refetch all tasks after adding
          return axios.post(Uri + "/userTasks", { sId: userData._id });
        })
        .then(newTaskRes => {
          dispatch(setTasks(newTaskRes.data.dbres));
        })
        .catch(err => {
          console.log("error in saving or fetching tasks", err);
        });
    }
  };
  

  return (
    <div className='d-flex flex-column container'>
          <div className='d-flex justify-content-between' >
               <h3 className='border border-round border-1 text-white bagd5 mt-2 mb-4 rounded-pill px-3'>welcome {userData.name} </h3>
                <div className='justify-content-center mt-4'><button className="btn btn-danger btn-sm " onClick={()=>handleLogout()}>logout</button></div>
          </div>
      <form onSubmit={submitHandler}>
      <div className="input-group input-group-lg border ">
  <span className="input-group-text" id="inputGroup-sizing-lg">Enter a task</span>
  <input type="text" className="form-control me-3" name='task' onChange={changeHandler} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>
    <button type='submit' className='btn btn-success'> Add</button>
</div>
      </form>
          {showTasks===false && <Link to={`/profile/userTasks/${userData._id}`}><button className='btn btn-success mt-3 ms-3 mb-2' onClick={()=>showTasksHandler()} >UserTasks</button></Link>
}
      <div className='container'>
        <div className="container">
         
          {showTasks === true && <Outlet context={{ showTasks, hideTasks: showTasksHandler }} />
}
       
        </div>
      </div>
    </div>
  )
}

export default Profile