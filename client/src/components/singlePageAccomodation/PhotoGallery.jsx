import React from "react";

import { LeftArrowIcon, ShareIcon, WishlistIcon } from "../../images/SVG";


const PhotoGallery = ({photos, setShowAllPhotos}) => {

  if(!photos) return <div> No photos </div>
  return (
    <div className="pb-4 pt-16 absolute h-fit inset-0 bg-black">
      <div className="flex justify-between text-white fixed w-full top-0 py-4 px-8">
        <button onClick={()=>setShowAllPhotos(false)} className="shadow-md hover:bg-gray-800 cursor-pointer" >
          {LeftArrowIcon}
        </button>
        <div className="flex gap-8">
          <span className="flex gap-1 items-center px-6 py-2 rounded-lg transition-all hover:bg-gray-800 cursor-pointer">
            {ShareIcon}
            <p className="underline">Share</p>
          </span>
          <span className="flex gap-1 items-center px-6 py-2 rounded-lg transition-all hover:bg-gray-800 cursor-pointer">
            {WishlistIcon}
            <p className="underline">Wishlist</p>
          </span>
        </div>
      </div>
        <div className="grid gap-4 max-w-3xl mx-auto pb-8 ">
          {
            photos.length > 0 &&
            photos.map(photo=>{
              return(
                <div className="flex justify-center items-center"> 
                  <img className="w-full object-cover rounded-2xl" src={`http://localhost:4000/uploads/${photo}`} alt="place" />
                </div>
              )
            })
          }
        </div>
        </div>
  );
};

export default PhotoGallery;
