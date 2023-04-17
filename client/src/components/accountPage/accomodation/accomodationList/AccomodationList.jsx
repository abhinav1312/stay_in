import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom';
import { startCase } from 'lodash';

const AccomodationList = () => {
    const {pathname} = useLocation();
    console.log(pathname)
    const [accomodations, setAccomodations] = useState([]);
    useEffect(()=>{
        const fetchAccomodationList = async () => {
            const {data} = await axios.get('/accomodation_list')
            setAccomodations(data);
        }
        fetchAccomodationList();

    }, [])

  return (
    
    <div className='min-h-screen'>
      { accomodations.length>0 &&
        accomodations.map(accomodation=>{
          let {title, description, photos} = accomodation;
          let photo = photos[0];
          console.log(photo)
          title = startCase(title);
          return (
          <Link key={accomodation._id} to={pathname + '/' + accomodation._id} className=" flex gap-4 w-full bg-gray-300 p-4 rounded-2xl">
          <div className="flex h-32 w-48 grow-1 shrink-0">
            <img className="object-cover" src={'http://localhost:4000/uploads/' + photo} alt="accomodation" />
          </div>
          <div className='grow-0'>
            <h2 className='text-xl font-medium'>{title}</h2>
            <p className='text-justify mt-2'>
              {description.substring(0, 500) + "......"}
            </p>
          </div>
        </Link>

          )
        })


      }
    </div>
  )
}

export default AccomodationList
