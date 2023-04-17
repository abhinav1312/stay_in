import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const RegisterPage = () => {

  const [userDetail, setUserDetail] = useState({name: '', email: '', password: ''});

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

  const registerUser = async  (e) => {
    e.preventDefault();
    try{
      const {data} = await axios.post('/register', {
        name: userDetail.name,
        email: userDetail.email,
        password: userDetail.password
      })
      if(!data) alert("User already exists.")
      else{
        alert("User added successfully!")
      }
    }
    catch(error) {console.log(error); alert("Something went wrong, please try registering again")}
    finally{setUserDetail({name: '', email: '', password: ''})};
  }

  return (
    <div className='mt-4 grow flex justify-center items-center pt-16'>
      <div className='mb-56 flex-[.25]'>
        <h1 className='text-4xl text-center mb-4'>Register</h1>
        <form className='flex flex-col gap-4' onSubmit={registerUser}>
          <input type="text" name="name" id="name" placeholder='John Doe' value={userDetail.name} onChange={handleDetailChange} />
          <input type="email" name="email" id="email" placeholder='abc@email.com' value={userDetail.email} onChange={handleDetailChange} />
          <input type="password" name="password" id="password" placeholder='password' value={userDetail.password} onChange={handleDetailChange} />
          <button type='submit' className='primary'> Register </button>
        </form>
        <div className='text-center p-2 text-gray-500'>
          Already a user?
          <span className='text-primary'>
            <Link to='/login'> Login</Link>
          </span> 
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
