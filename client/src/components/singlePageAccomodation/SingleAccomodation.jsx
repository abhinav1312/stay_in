
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios'
import { upperCase, capitalize } from 'lodash';
import { ShareIcon, WishlistIcon } from '../../images/SVG';
import PhotoGallery from './PhotoGallery';

const SingleAccomodation = () => {
    const {id} = useParams();
    const [showAllPhotos, setShowAllPhotos] = useState(false);
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

   
    if(showAllPhotos){
      return <PhotoGallery photos={accomodation.photos} setShowAllPhotos={setShowAllPhotos} />
    }


  return (
    <div className='mt-8'>
      <h1 className='text-2xl font-medium text-justify [word-spacing:.4rem] tracking-wide'>{upperCase(accomodation.title)}</h1>
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

      <div onClick={()=>setShowAllPhotos(true)} className="grid md:grid-cols-3 grid-rows-2 py-4 cursor-pointer gap-2 ">
        <div className='row-span-2 col-span-2 hover:opacity-80'>
          <img className='h-full object-cover' src={`http://localhost:4000/uploads/${accomodation.photos[0]}`} alt="" />
        </div>
        <div className='hover:opacity-80'>
          <img className='h-full object-cover' src={`http://localhost:4000/uploads/${accomodation.photos[1]}`} alt="" />
        </div>
        <div className='hover:opacity-80'>
          <img className='h-full object-cover' src={`http://localhost:4000/uploads/${accomodation.photos[2]}`} alt="" />
        </div>
      </div>

      <div className='max-w-3xl'>
        <div className='grid grid-rows-2 grid-cols-2 justify-between'>
          <h2 className=' text-xl font-medium col-span-1 row-span-1'>Farm stay hosted by "Hostname"</h2>
          <span className='row-start-2 col-span-1 row-span-1 flex gap-8'> {accomodation.maxGuests} guests &middot; 2 bedrooms &middot; 3 beds &middot; 4 bathroomsd  </span>
          <div className='row-span-2 items-end'>
            <div className="w-12 h-full bg-gray-500 rounded-full"></div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SingleAccomodation
