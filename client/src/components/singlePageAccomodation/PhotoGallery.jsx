import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LeftArrowIcon, ShareIcon, WishlistIcon } from "../../images/SVG";
import axios from "axios";

const PhotoGallery = ({photos, setShowAllPhotos}) => {
  // const { id } = useParams();
  // const navigate = useNavigate();
  // const [photos, setPhotos] = useState()
  // useEffect(()=>{
  //   const getPhotos = async() => {
  //     if(!id) return;
  //     try{
  //       const {data} = await axios.get(`/accomodation/${id}`);
  //       setPhotos([...data.photos]);
  //     }
  //     catch(error){
  //       console.log(error);
  //       alert("Error occured while fetching photos. Please refresh again.")
  //     }
  //   }
  //   getPhotos();
  // }, [id])

  // console.log(photos);

  if(!photos) return <div> No photos </div>
  return (
    <div className="py-4">
      <div className="flex justify-between bg-white sticky top-0 py-4">
        <button onClick={()=>setShowAllPhotos(false)} className="shadow-md hover:bg-gray-100" >
          {LeftArrowIcon}
        </button>
        <div className="flex gap-8">
          <span className="flex gap-1 items-center px-6 py-2 rounded-lg transition-all hover:bg-gray-100">
            {ShareIcon}
            <p className="underline">Share</p>
          </span>
          <span className="flex gap-1 items-center px-6 py-2 rounded-lg transition-all hover:bg-gray-100">
            {WishlistIcon}
            <p className="underline">Wishlist</p>
          </span>
        </div>
      </div>
      
        <div className="photoGrid grid gap-2">
          <div className="items-center row-span-2 col-span-2"> 
            <img className="w-full h-full object-cover" src={`http://localhost:4000/uploads/${photos[0]}`} alt="" />
          </div>
          <div className="items-center row-span-2 col-span-2"> 
            <img className="w-full h-full object-cover" src={`http://localhost:4000/uploads/${photos[1]}`} alt="" />
          </div>
          <div className=" items-center row-span-1 col-span-1"> 
            <img className="w-full h-full object-cover " src={`http://localhost:4000/uploads/${photos[2]}`} alt="" />
          </div>
          <div className=" items-center row-span-1 col-span-1"> 
            <img className="w-full h-full object-cover" src={`http://localhost:4000/uploads/${photos[3]}`} alt="" />
          </div>
          <div className=" items-center row-span-2 col-span-2"> 
            <img className="w-full h-full object-cover" src={`http://localhost:4000/uploads/${photos[4]}`} alt="" />
          </div>
          <div className=" items-center row-span-2 col-span-2"> 
            <img className="w-full h-full object-cover" src={`http://localhost:4000/uploads/${photos[4]}`} alt="" />
          </div>
          <div className=" items-center col-span"> 
            <img className="w-full h-full object-cover" src={`http://localhost:4000/uploads/${photos[3]}`} alt="" />
          </div>
          <div className=" items-center row-span-1 col-span-1"> 
            <img className="w-full h-full object-cover " src={`http://localhost:4000/uploads/${photos[2]}`} alt="" />
          </div>
        </div>
        </div>
  );
};

export default PhotoGallery;
