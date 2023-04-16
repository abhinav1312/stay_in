import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const AccomodationListChild = () => {
  const {id}=useParams();
  const [accomodation, setAccomodation] = useState({});
  console.log(id)
  useEffect(()=>{
    const getData = async () => {
      if(id){
        const {data} = await axios.get('/accomodation_list/'+id);
        setAccomodation(data[0]);
      }
    }
    getData();
  }, [id])

  return (
    <div>
      {
        accomodation &&
        <div>
          Hello behenchod
        </div>
      }
    </div>
  )
}

export default AccomodationListChild
