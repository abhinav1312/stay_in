import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Description from '../newAccomodation/Description';

const AccomodationListChild = () => {
  const {id}=useParams();
  const [accomodation, setAccomodation] = useState({
    title: "",
    description: "",
    maxGuests: "",
    extraInfo: "",
    address: {
      city: "",
      state: "",
      houseNo: ""
    },
    photos: [],
    perks: [],
    checkIn: "",
    checkOut: ""
  });
  useEffect(()=>{
    const getData = async () => {
      if(id){
        const {data} = await axios.get('/accomodation_list/'+id);
        const [details] = data;
        const {title, description, maxGuests, extraInfo, address, photos, perks, checkIn, checkOut} = details;
        setAccomodation({title, description, maxGuests, extraInfo, address, photos, perks, checkIn, checkOut});
      }
    }
    getData();
  }, [id])

  const setDescription = e => {
    setAccomodation(prev=>{
      return { ...prev, description: e}
    })
  }

  return (
    <div>
      {
        accomodation &&
        <Description description={accomodation.description} setDescription={setDescription} />
      }
    </div>
  )
}

export default AccomodationListChild
