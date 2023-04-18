import React, { useState } from 'react'
import ImageGallery from 'react-image-gallery';

const Carousel = ({photos}) => {
	const images = [];
	for(let i=0; i<5; i++){
		images.push({original:`http://localhost:4000/uploads/${photos[i]}`});
	}
  return (
    <ImageGallery items={images} showIndex={true}/>
  )
}

export default Carousel
