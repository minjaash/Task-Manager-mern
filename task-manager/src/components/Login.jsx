import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = ({setIsLoggedIn}) => {
  const Uri="http://localhost:4000"
      const[values,setValues]=useState({email:"",password:""})
      const navigate=useNavigate();
  
      
    const changeHandler=(event)=>{
      const  {name,value}=event.target;
      setValues({...values,[name]:value})

    }
  
  const handleSubmit=(event)=>{
          event.preventDefault();
          console.log(values)
          axios.post(Uri+"/login",values)
          .then(res=>{
            console.log("user verified",res)
             if((localStorage.getItem("user"))&&(localStorage.getItem("user")===res.data.token)){
            
              setIsLoggedIn(true);
              navigate("/profile")
             }
              else{
                  localStorage.setItem("user", res.data.token)
                  setIsLoggedIn(true);
                  navigate("/profile")
              }
          })
          .catch(err=>{
            console.log('err in login',err)
             localStorage.removeItem("user");
              setIsLoggedIn(false);
              navigate("/");
          })
  
      }
  return (
    <div>
      <form onSubmit={handleSubmit}>
            
            <div className="mb-3">
                <label for="exampleInputPassword1"  className="form-label" >Email</label>
                <input type="email" className="form-control" id="exampleInputPassword1"  name="email" onChange={changeHandler} />
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={changeHandler}  />
            </div>
            
            <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
  )
}

export default Login