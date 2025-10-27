import React, { useState } from 'react'

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = ({setIsLoggedIn}) => {
    const Uri=process.env.REACT_APP_API_URL;
    const[values,setValues]=useState({name:"",email:"",password:""})
    const navigate=useNavigate();


    const changeHandler=(event)=>{
      const  {name,value}=event.target;
      setValues({...values,[name]:value})

    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        console.log(values)
        axios.post(Uri+"/register",values)
        .then(res=>{
           if(!(localStorage.getItem("user"))&&(localStorage.getItem("user")!==res.data.token)){
            localStorage.setItem("user", res.data.token)
            navigate("/profile")
           }
            else{
                localStorage.setItem("user", res.data.token)
                navigate("/profile")
            }
        })
        .catch(err=>{
          console.log('err in saving',err);
           localStorage.removeItem("user");
        setIsLoggedIn(false);
        navigate("/")
        })

    }

  return (
    <div>
    <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Name</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='name' onChange={changeHandler}/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
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

export default Register