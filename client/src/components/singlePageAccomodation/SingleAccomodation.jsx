import React, { useEffect } from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios'

const SingleAccomodation = () => {
    const {id} = useParams();
    useEffect(()=>{
      axios.get(`/accomodation/${id}`).then(data=>{
        console.log(data)
      })
    }, [id])
  return (
    <div>
      single accomodation {id}
    </div>
  )
}

export default SingleAccomodation
