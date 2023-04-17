import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Title from "./Title";
import Address from "./Address";
import Ammenities from "./Ammenities";
import MaxGuests from "./MaxGuests";
import ImageUpload from "./ImageUpload";
import Description from "./Description";
import ExtraInfo from "./ExtraInfo";
import CheckInCheckOut from "./CheckInCheckOut";
import { Navigate, useParams } from "react-router-dom";
import Loader from "../../../loader/Loader";
import LoaderContext from "../../../../context/loader/LoaderContext";
import PricePerNight from "./PricePerNight";


const NewAccomodation = () => {
  const {id} = useParams();
  const imageUpload = useRef();
  const {loader, setLoader} = useContext(LoaderContext);
  const [imgLink, setImgLink] = useState("");
  const [redirect, setRedirect] = useState(null);
  const [accomodation, setAccomodation] = useState({
    title: "",
    description: "",
    maxGuests: 0,
    extraInfo: "",
    address: {
      city: "",
      state: "",
      houseNo: "",
      country: ""
    },
    pricePerNight: 0,
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

  const handleEdit = (e) =>{
    const {name, value} = e.target
    if(name === 'houseNo' || name === 'city' || name === 'state' || name === 'country'){
      const {state, city, houseNo, country} = accomodation.address
      setAccomodation(prev=>{
        return({
          ...prev,
          address: {
            city, state, houseNo, country,
            [name]: value
          }
        })
      })
    }
    else{
      setAccomodation(prev=>{
        return {...prev, [name]: value}
      })
    }
  }


  const handleImgLinkUpload = async () => {
    setLoader(true);
    if (imgLink === "") {
      alert("Please enter a valid link");
      setLoader(false);
      return;
    }
    if(accomodation.photos.length === 10){
      alert("Cannot add more than 10 images.");
      setLoader(false);
      return;
    }
    try {
      const { data } = await axios.post("/upload_by_link", { imgLink });
      if(data){
        const photosCopy = accomodation.photos;
        if(photosCopy.length > 0){
          setAccomodation(prev=>{return {...prev, photos: [...photosCopy, data]}})
        }
        else{
          setAccomodation(prev=>{return {...prev, photos: [data]}})
        }
        alert("Posted successfully");
      }
      else{
        alert("Error uploading, please check the link and try again");
      }
      setImgLink("");
    } catch (error) {
      alert("Error occured while uploading image, please try again");
    } finally{
      setLoader(false);
    }
  };

  const handleImageUpload = async (event) => {
    setLoader(true);
    if(accomodation.photos.length >= 10){
      alert("Cannot add more than 10 images.");
      return;
    }
    const files = event.target.files;
    const imgData = new FormData();

    for(let i=accomodation.photos.length; i<10; i++) {
      imgData.append('photos', files[i-accomodation.photos.length]);
    }
    try {
      const { data } = await axios.post("/upload_by_img", imgData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Upload successful!");
      const photosCopy = accomodation.photos;
      if(photosCopy.length > 0){
        setAccomodation(prev=>{return {...prev, photos: [...photosCopy, ...data]}})
      }
      else{
        setAccomodation(prev=>{return {...prev, photos: [...data]}})
      }
    } catch (error) {
      alert("Error occured while uploading from file, please try again");
      console.log(error)
    } finally{
      setLoader(false);
    }
  };


  const removeImg = async (filename) => {
    setLoader(true);
    try{
      const {data} = await axios.post('/delete_img', {filename})
      if(data){
        const uploadedImgCopy = accomodation.photos.filter(item=> item!== filename)
        alert("Image delete successfully");
        setAccomodation(prev=>{
          return({
            ...prev, photos: uploadedImgCopy
          })
        })
      }
      else{
        alert("Internal server error, please try again");
      }
    }catch(error){
      alert("Some error occured while deleting, please try again");
    }finally{
      setLoader(false);
    }
  };

  const handleAmmenities = (value, isChecked) => {
    if (isChecked) {
      const perksArrayCopy = accomodation.perks
      setAccomodation(prev=>{
        return { ...prev, perks: [...perksArrayCopy, value]}
      })
    } else {
      const perksArrayCopy = accomodation.perks.filter(perks=> perks !== value);
      setAccomodation(prev=>{
        return { ...prev, perks: [...perksArrayCopy]}
      })
    }
  };


  const handleAccomodationUpload = async (e) => {
    e.preventDefault();
    setLoader(true);
    const {title, description, extraInfo, address, checkIn, checkOut, pricePerNight, maxGuests} = accomodation;

    const titleCopy = title.trim().toLowerCase();
    const descriptionCopy = description.trim().toLowerCase();
    const extraInfoCopy = extraInfo.trim().toLowerCase();
    const {country, state, city, houseNo} = address;
    const stateCopy = state.trim().toLowerCase();
    const countryCopy = country.trim().toLowerCase();
    const cityCopy = city.trim().toLowerCase();
    const houseNoCopy = houseNo.trim().toLowerCase();
    if(titleCopy==='' || descriptionCopy==='' || accomodation.perks.length===0 || extraInfoCopy==='' || accomodation.photos.length===0 || countryCopy==='' || stateCopy==='' || cityCopy==='' ||houseNoCopy ==='' || maxGuests===0 || checkIn==='' || checkOut==='' || pricePerNight===0){
      alert("Please fill all the required fields");
      setLoader(false);
      return;
    }
   const addressCopy = {city: cityCopy, houseNo: houseNoCopy, state: stateCopy, country: countryCopy}
   if(id){
    try{
      setLoader(true);
      const {data} = await axios.post('/update_accomodation', {id,title: titleCopy, description: descriptionCopy, extraInfo: extraInfoCopy, address: addressCopy, maxGuests, photos:accomodation.photos, checkIn, checkOut, perks: accomodation.perks, pricePerNight});
        if(data) setRedirect('/account');
        alert("Accomodation updated successfully")
    }
    catch(error){
      alert("Error while updating. Please try again");
      console.log(error);
    }
    finally{
      setLoader(false);
    }
   }
   else{
    try{
      setLoader(true);
      const {data} = await axios.post('/upload_accomodation', {title: titleCopy, description: descriptionCopy, extraInfo: extraInfoCopy, address: addressCopy, maxGuests, photos:accomodation.photos, checkIn, checkOut, perks: accomodation.perks, pricePerNight});
      if(data) setRedirect('/account');
      alert("Accomodation uploaded successfully")
    }
    catch(error){
      alert("Error while uploading. Please try again");
      console.log(error)
    }
    finally{
      setLoader(false);
    }
   }

  };

  if(loader) return <Loader />
  if(redirect){
    return <Navigate to={redirect} />
  } 

  return (
    <>
      <div className="lg:w-2/3 mx-auto">
        <form onSubmit={handleAccomodationUpload} className="flex flex-col gap-8">
          <Title title={accomodation.title} handleEdit={handleEdit} />
          <Address address={accomodation.address} handleEdit={handleEdit} />
          <Ammenities handleAmmenities={handleAmmenities} alreadySelected={accomodation.perks} />
          <MaxGuests maxGuests={accomodation.maxGuests} handleEdit={handleEdit}/>
          <PricePerNight pricePerNight={accomodation.pricePerNight} handleEdit={handleEdit} />
          <ImageUpload setImgLink={setImgLink} imgLink={imgLink} handleImageUpload={handleImageUpload} handleImgLinkUpload={handleImgLinkUpload} imageUpload={imageUpload} removeImg={removeImg} uploadedImages={accomodation.photos} />
          <Description description={accomodation.description} handleEdit={handleEdit} />
          <ExtraInfo extraInfo={accomodation.extraInfo} handleEdit={handleEdit} />
          <CheckInCheckOut checkIn={accomodation.checkIn} checkOut={accomodation.checkOut} handleEdit={handleEdit} />
          <button type="submit" value="submit" className="primary">
            Submit
          </button>
        </form>
      </div>
      
    </>
  );
};

export default NewAccomodation;
