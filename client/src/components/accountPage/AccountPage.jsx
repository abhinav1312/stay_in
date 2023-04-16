import React, { useContext } from 'react'
import UserContext from '../../context/UserContext';
import { NavLink, Navigate, useParams } from 'react-router-dom';
import ProfilePage from './profile/ProfilePage';
import AccomodationPage from './accomodation/AccomodationPage';
import {ProfileIcon2, HouseIcon, ListIcon} from '../../images/SVG';

const AccountPage = () => {
  // const [redirect, setRedirect] = useState(null);
  const {user, ready} = useContext(UserContext);
  const {subpage} = useParams();

  if(!ready) return "Loading...";
  if(ready && !user) return <Navigate to='/login' />;

  return (
    <>
    <nav className='flex justify-center gap-8 mt-8 mb-8'>
      <NavLink to='/account' end className='account-link'> {ProfileIcon2} My Profile </NavLink>
      <NavLink to='/account/bookings' className='account-link'> {ListIcon}My Bookings </NavLink>
      <NavLink to='/account/accomodations' className='account-link'> {HouseIcon} My Accomodations </NavLink>
    </nav>
     { subpage === undefined && <ProfilePage /> }
     { subpage === 'accomodations' && <AccomodationPage />} 
    </>
  )
}

export default AccountPage;
