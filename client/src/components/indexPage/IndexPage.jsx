import React, {useEffect, useState} from 'react';
import axios from "axios";
import AccomodationCard from './AccomodationCard';

const IndexPage = () => {
  const [accomodations, setAccomodations] = useState(null);

  useEffect(()=>{
    const getAccomodations = async () => {
      try{

        const {data} = await axios.get('/');
        setAccomodations(data);
      }catch(err){
        console.log(err);
        alert("Some error occured while uploading accomodation please refresh page !");
      }
    }
    getAccomodations();
  }, [])

  return (
    <>
      <div className='accomodationCards'>
     { accomodations !== null &&
      accomodations.map(accomodation=>{
        return <AccomodationCard key = {accomodation._id} accDetails = {accomodation} />
      })

     }
      </div>

      
     
    </>
  )
}

export default IndexPage
