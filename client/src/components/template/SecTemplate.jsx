import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { ProfileIcon2, ListIcon, HouseIcon } from '../../images/SVG'

const SecTemplate = () => {
  return (
    <div>

    <nav className='flex justify-center gap-8 mt-8 mb-8'>
      <NavLink to='/account' end className='account-link'> {ProfileIcon2} My Profile </NavLink>
      <NavLink to='/account/bookings' className='account-link'> {ListIcon}My Bookings </NavLink>
      <NavLink to='/account/accomodations' className='account-link'> {HouseIcon} My Accomodations </NavLink>
    </nav>

    <Outlet />
    </div>
  )
}

export default SecTemplate;
