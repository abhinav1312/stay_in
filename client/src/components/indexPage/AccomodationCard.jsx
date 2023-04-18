import React from 'react'
import { capitalize } from 'lodash';
import Carousel from './Carousel';
const AccomodationCard = ({accDetails}) => {
    const {address, pricePerNight, photos} = accDetails;
    const {city, country} = address;
  return (
    <div className='accomodationCard h-96 w-72'>
        <div className='h-4/5 mb-2'>
            <Carousel photos={photos} />
            {/* <img className='object-cover w-full h-full' src={`http://localhost:4000/uploads/${photos[0]}`} alt="main" /> */}
        </div>
        <div>
            <h3 className='font-medium text-lg'>{capitalize(city)}, {capitalize(country)}</h3>
            <h3 className='text-lg font-medium'>&#x20B9; {pricePerNight}/- <span className='text-gray-500 font-normal'> per night </span>  </h3>
        </div>
    </div>
  )
}

export default AccomodationCard;
