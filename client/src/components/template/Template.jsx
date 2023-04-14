import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Template = () => {
  return (
    <div className='px-20 py-8 flex flex-col min-h-screen'>
        <Header />
        <Outlet />
    </div>
  )
}

export default Template;
