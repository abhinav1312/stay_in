import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios';
import UserContext from '../../context/UserContext';

const LoginPage = () => {
  const [userDetail, setUserDetail] = useState({email: '', password: ''});
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);

  const handleDetailChange = (e) => {
    const {name, value} = e.target;
    setUserDetail(prev=>{
      return (
        {
          ...prev, 
          [name]: value
        }
      )
    })
  }

  const loginUser = async (e) => {
    e.preventDefault();
    try{
      const {data} = await axios.post('/login', {email: userDetail.email, password: userDetail.password}, {withCredentials: true})
      alert("Login successful!");
      setUser(data);
      setRedirect(true);
    }catch(error){
      alert("Something went wrong, please try again.");
      console.log(error);
    }
  }

  if(redirect){
    return <Navigate to='/' />;
  }

  return (
    <div className='mt-4 grow flex justify-center items-center'>
      <div className='mb-56 flex-[.25]'>
        <h1 className='text-4xl text-center mb-4'> Login </h1>
        <form className='flex flex-col gap-4' onSubmit={loginUser}>
          <input type="email" name="email" id="email" placeholder='abc@email.com' value={userDetail.email} onChange = {handleDetailChange}/>
          <input type="password" name="password" id="password" placeholder='password' value={userDetail.password} onChange = {handleDetailChange} />
          <button type='submit' className='primary'> Login </button>
        </form>
        <div className='text-center p-2 text-gray-500'>
          Dont have an account yet?
          <span className='text-primary'>
            <Link to='/register'> Register</Link>
          </span> 
        </div>
      </div>
    </div>
  )
}

export default LoginPage
