import React from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { AddIcon, ListIcon2 } from '../../../images/SVG';
import NewAccomodation from './newAccomodation/NewAccomodation';

const AccomodationPage = () => {
  const {action} = useParams();
  return (
    <>
      {action !== 'add_new' && 
        <div className='flex gap-16 justify-center'>
          <NavLink to='/account/accomodations/accomodation_list' className="account-link"> {ListIcon2} My listed accomodations</NavLink>
          <NavLink to='/account/accomodations/add_new' className="account-link"> {AddIcon} Add new accomodation</NavLink>
        </div>
      }

      {action==='add_new' && <NewAccomodation />}
    </>
  )
}

export default AccomodationPage;
