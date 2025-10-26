
import './App.css';
import {BrowserRouter as Router,Routes,Route, Link} from "react-router-dom"
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Edit from './components/Edit';
import Delete from './components/Delete';
import UserTasks from './components/UserTasks';
import Profile from './components/Profile';
import { useEffect, useState } from 'react';


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
  const token = localStorage.getItem('user');
  if (token && token !== "undefined") {
    setIsLoggedIn(true);
  } else {
    setIsLoggedIn(false);
  }
}, []);


  return (
    <div className="App border border-2 border-tertiary bagd1 p-2 m-3">
      <Router>
      <div className='bg-warning text-dark container border border-secondary border-2 '>
        <h1> Task Manager Application</h1>
        <div className=' d-flex'>
     
            {!isLoggedIn && (
              <>
                <Link to='/register'><button className='btn btn-primary'>Register</button></Link>
                <Link to='/login'><button className='btn btn-success ms-3 mb-2'>Login</button></Link>
              </>
            )}
            {/* {isLoggedIn && (
              <Link to='/profile'><button className='btn btn-danger m-2'>temp</button></Link>
            )}   */}
        </div>
      </div>
       {/* defining the routes */}
       <section>
        <Routes>
        
          
       <Route path='/' element={<Home/>}></Route>
       <Route path='/register' element={<Register setIsLoggedIn={setIsLoggedIn}/>}></Route>
       <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn}/>}></Route>
       
       <Route path='/profile' element={<Profile setIsLoggedIn={setIsLoggedIn} />}>
            <Route path='userTasks/:sId' element={<UserTasks/>}> 
                    <Route path='delete/:tid' element={<Delete/>}></Route>
           
           </Route>
            <Route path='edit/:tid' element={<Edit/>}></Route>
       
       </Route>
      
        
       
       </Routes></section>
      </Router>
    </div>
  );
}

export default App;
