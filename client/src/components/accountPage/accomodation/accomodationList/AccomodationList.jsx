import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const AccomodationList = () => {

    const [accomodations, setAccomodations] = useState([]);
    useEffect(()=>{
        const fetchAccomodationList = async () => {
            const {data} = await axios.get('/accomodation_list')
            setAccomodations(data);
            
        }
        fetchAccomodationList();

    }, [])

    const desc = "Jannat blends the most luxurious backdrop of your fantasy with nature’s incredible marvels to create a tranquil utopia that caters to your comfort where Breakfast is complimentary! This 3Bed pool villa in Nashik is a hidden paradise waiting to dazzle you with its tranquil charm.Surrounded by nature as far as the eyes can see,the open lawns within the premises give you all the space you need to take a refreshing walk,practice your morning asanas or indulge your kids in a fun game of catch&cook. This villa offers 3 spacious bedrooms and ensuite bathrooms in 2 bedrooms, giving you ample space to have a luxurious getaway from the congested city life. With an elderly-friendly approach in mind, 1 bedroom of the villa is situated on the ground level, where your elderly parents can rest in comfort without having to make their way up the stairs."
    let size=120;
  return (
    // <div className='min-h-screen grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
    //   <div className="w-full h-80 rounded-full transition-all hover:scale-105">
    //     <img src="https://a0.muscache.com/im/pictures/miso/Hosting-605371928419351152/original/c8f48e8b-091d-47ea-85ac-b31bc2604bbb.jpeg?im_w=720" alt="house"
    //       className='h-2/3 w-full object-cover'
    //     />
    //       <h2 className='mt-4 font-medium'> Lonavala, India </h2>
    //       <span className='font-medium'> Rs. 3270 </span> <span className='font-light'> night </span>
    //   </div>
    // </div>
    
    
    <div className='min-h-screen'>
      { accomodations.length>0 &&
        accomodations.map(accomodation=>{
          let {title, description} = accomodation;
          title = title[0].toUpperCase() + title.substring(1);
          return (
          <Link to={'/account/accomodation/accomodation_list/' + 1234} className=" flex gap-4 w-full bg-gray-300 p-4 rounded-2xl">
          <div className="h-32 w-32 bg-gray-500 grow-1 shrink-0"></div>
          <div className='grow-0'>
            <h2 className='text-xl font-medium'>{title}</h2>
            <p className='text-justify mt-2'>
              {desc.substring(0, 200) + "......"}
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
