import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom';
import axios from 'axios'
import { upperCase, capitalize } from 'lodash';
import { ShareIcon, WishlistIcon } from '../../images/SVG';

const SingleAccomodation = () => {
    const {id} = useParams();
    // const [accomodation, setAccomodation] = useState(null);
    const [accomodation, setAccomodation] = useState(null);
    useEffect(()=>{
      const getData = async()=>{
        if(!id) return;
        try{
          const {data} = await (axios.get(`/accomodation/${id}`));
          const {title, description, perks, pricePerNight, extraInfo, address, checkIn, checkOut, maxGuests, photos} = data;
          setAccomodation({id, title, description, perks, pricePerNight, extraInfo, address, checkIn, checkOut, maxGuests, photos});
        }catch(error){
          console.log(error);
          alert("Some error occured while loading the accomodation, please refresh the page")
        }
      }
      getData();
    }, [id])

    if(!accomodation) return <div>LOL</div>

    // let title, address, perks, photos, description, checkIn, checkOut, maxGuests, pricePerNight;

    // if(accomodation){
    //   title = upperCase(accomodation.title);
    //   description = capitalize(accomodation.description);
    //   perks = accomodation.perks;
    //   photos = accomodation.photos;
    //   checkIn = accomodation.checkIn;
    //   checkOut = accomodation.checkOut;
    //   maxGuests = accomodation.maxGuests;
    //   address = accomodation.address;
    //   pricePEr
    // }


  return (
    <div className='mt-8'>
      <h1 className='text-2xl text-justify [word-spacing:.4rem] tracking-wide'>{upperCase(accomodation.title)}</h1>
      <div className='flex justify-between py-1'>
        <a className='font-medium underline cursor-pointer' target='_blank' rel='noreferrer'  href={`https://maps.google.com/?q=${accomodation.address.city}`}> {capitalize(accomodation.address.city)}, {capitalize(accomodation.address.country)}  </a>
        <div className='flex gap-8'>
          <span className='flex gap-1 items-center px-6 py-2 rounded-lg transition-all hover:bg-gray-100'>
            {ShareIcon}
            <p className='underline'>Share</p>
          </span>
          <span className='flex gap-1 items-center px-6 py-2 rounded-lg transition-all hover:bg-gray-100'>  
            {WishlistIcon}
            <p className='underline'>Wishlist</p>
          </span>  
        </div>
      </div>

      <Link to={`/${accomodation.id}/photos`} className="grid grid-cols-[2fr_1fr_1fr] grid-rows-2 py-4">
        <div className='row-span-2 mr-2 my-0'>
          <img className='h-full w-full object-cover' src={`http://localhost:4000/uploads/${accomodation.photos[0]}`} alt="" />
        </div>
        <div className='mb-1 mr-1'>
          <img className='aspect-square object-cover' src={`http://localhost:4000/uploads/${accomodation.photos[1]}`} alt="" />
        </div>
        <div className='ml-1 mb-1'>
          <img className='aspect-square object-cover' src={`http://localhost:4000/uploads/${accomodation.photos[2]}`} alt="" />
        </div>
        <div className='col-start-2 mt-1 mr-1'>
          <img className='aspect-square object-cover' src={`http://localhost:4000/uploads/${accomodation.photos[3]}`} alt="" />
        </div>
        <div className='ml-1 mt-1'>
          <img className='aspect-square object-cover' src={`http://localhost:4000/uploads/${accomodation.photos[4]}`} alt="" />
        </div>
      </Link>
    </div>
  )
}

export default SingleAccomodation
