
import React, { useEffect, useRef, useState } from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios'
import { upperCase, capitalize } from 'lodash';
import { DoubleBedIcon, EntryIcon, FlagIcon, RadioIcon, ShareIcon, SingleBedIcon, TruckIcon, TvIcon, WifiIcon, WishlistIcon } from '../../images/SVG';
import PhotoGallery from './PhotoGallery';

const SingleAccomodation = () => {
    const {id} = useParams();
    const descRef = useRef();
    const [fullDesc, setFullDesc] = useState(false);
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

    const showFullDesc = () => {
      setFullDesc(true);
    }

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

      <div className='max-w-2xl'>

        <div className='grid grid-rows-2 grid-cols-2 gap-1'>
          <h2 className=' text-xl font-medium col-span-1 row-span-1'>Farm stay hosted by "Hostname"</h2>
          <span className='row-start-2 col-span-1 row-span-1 flex gap-8 text-gray-500'> {accomodation.maxGuests} guests &middot; 2 bedrooms &middot; 3 beds &middot; 4 bathrooms  </span>
          <div className='flex justify-end row-span-2 items-end'>
            <div className="h-16 w-16 bg-gray-500 rounded-full"></div>
          </div>
        </div>

        <hr className='my-8 border-gray-300' />

        <div className='h-max'>
          <h2 className='text-xl font-medium'> Description </h2>
          <p ref={descRef} className={`${!fullDesc ? "line-clamp-5" : " "} !text-[#222222] font-light text-justify`}>{capitalize(accomodation.description)}...</p>
          { 
            fullDesc ?
            <button onClick={()=>setFullDesc(false)} className='mt-4 bg-primary text-white' >See less</button>
            :
            <button onClick={()=>setFullDesc(true)} className='mt-4 bg-primary text-white' >See more</button>

          }
        </div>

        <hr className='my-8 border-gray-300' />

        <div>
          <h2 className='text-xl font-medium'> Where you'll sleep </h2>
          <div className="border p-4 flex flex-col gap-4 w-max rounded-2xl my-4">
            <div className='flex gap-4'>
              {DoubleBedIcon} {DoubleBedIcon} {SingleBedIcon}  
            </div>
            <div>
              <h3 className="text-lg font-medium">2 bedrooms</h3>
              <p className='font-light text-gray-500'>2 double beds, 1 single bed</p>
            </div>
          </div>
        </div>

        <hr className='my-8 border-gray-300' />

        <div>
          <h2 className='text-xl font-medium'> What this place offers </h2>
          <div className='my-4 grid grid-cols-2 gap-6'>
            <span className={`${accomodation.perks.includes('air conditioner')? '' : 'line-through text-gray-500' } flex gap-2`}> {FlagIcon} Air Conditioner </span>
            <span className={`${accomodation.perks.includes('pets')? '' : 'line-through text-gray-500' } flex gap-2`} > {EntryIcon} Pets allowed </span>
            <span className={`${accomodation.perks.includes('wifi')? '' : 'line-through text-gray-500' } flex gap-2`} > {WifiIcon} Wifi  </span>
            <span className={`${accomodation.perks.includes('radio')? '' : 'line-through text-gray-500' } flex gap-2`} > {RadioIcon} Radio </span>
            <span className={`${accomodation.perks.includes('free parking spot')? '' : 'line-through text-gray-500' } flex gap-2`} > {TruckIcon} Free parking spot </span>
            <span className={`${accomodation.perks.includes('tv')? '' : 'line-through text-gray-500' } flex gap-2`} > {TvIcon} Television </span>
          </div>
        </div>

        <hr className='my-8 border-gray-300' />

      </div>
    </div>
  )
}

export default SingleAccomodation
