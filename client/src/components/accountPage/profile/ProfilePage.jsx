import React, { useContext, useState } from 'react'
import UserContext from '../../../context/UserContext'
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const ProfilePage = () => {
  const {user, setUser} = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  const logout = async()=>{
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }
  if(redirect){
    return <Navigate to={redirect} />
  }
  return (
    <div className="text-center ">
        Logged in as {user.name} ( {user.email} ) <br />
        <button onClick={logout} className='mt-2 bg-primary text-white max-w-lg'> Logout </button>
    </div>
  )
}

export default ProfilePage
