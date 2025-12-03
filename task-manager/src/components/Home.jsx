import React, { useEffect } from 'react'

const Home = () => {
  useEffect(()=>{
    if(localStorage.getItem("user"))
      localStorage.removeItem("user")
  })
  return (
    <div>
        <p>Welcome to Task Manager.Please register or Login to continue. </p> 
           
    </div>
  )
}

export default Home