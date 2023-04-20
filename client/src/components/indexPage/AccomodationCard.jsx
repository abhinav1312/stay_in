import React from 'react'
import { capitalize } from 'lodash';
import Carousel from './Carousel';
import {Link} from 'react-router-dom'
const AccomodationCard = ({accDetails}) => {
    const {address, pricePerNight, photos, title, _id} = accDetails;
    const {city, country} = address;
  return (
    <Link to={'/' + _id} className='accomodationCard h-96 w-72'>
        <div className='h-4/5 mb-2 rounded-xl overflow-hidden'>
            <Carousel photos={photos} />
        </div>
        <div>
            <h3 className='font-medium text-lg'>{capitalize(city)}, {capitalize(country)}</h3>
            <p className='text-gray-500 leading-4 my-1 text-justify'> {capitalize(title)}... </p>
            <h3 className='text-lg font-medium'>&#x20B9; {pricePerNight}/- <span className='text-gray-500 font-normal'> per night </span>  </h3>
        </div>
    </Link>
  )
}

export default AccomodationCard;
