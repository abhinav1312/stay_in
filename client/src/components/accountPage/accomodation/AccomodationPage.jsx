import React from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { AddIcon, ListIcon2 } from '../../../images/SVG';
import NewAccomodation from './newAccomodation/NewAccomodation';
import AccomodationList from './accomodationList/AccomodationList';

const AccomodationPage = () => {
  const {action} = useParams();
  return (
    <>
      {/* {action !== 'add_new' && action !== 'accomodation_list' &&  */}
        <div className='flex gap-16 justify-center'>
          <NavLink to='/account/accomodations/accomodation_list' className="account-link"> {ListIcon2} My listed accomodations</NavLink>
          <NavLink to='/account/accomodations/add_new' className="account-link"> {AddIcon} Add new accomodation</NavLink>
        </div>
      {/* } */}

      {/* {action==='add_new' && <NewAccomodation />}
      {action==='accomodation_list' && <AccomodationList />} */}
    </>
  )
}

export default AccomodationPage;
