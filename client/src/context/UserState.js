import React, { useState, useEffect } from 'react'
import axios from 'axios';
import UserContext from './UserContext'

const UserState = (props) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(()=>{
    axios.get('/profile').then(({data})=>{
      setUser(data);
      setReady(true);
    })

  }, [])

  return (
    <>
      <UserContext.Provider value={{user, setUser, ready}}>
        {props.children}
      </UserContext.Provider>
    </>
  )
}

export default UserState;
