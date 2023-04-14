import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import Title from "./Title";
import Address from "./Address";
import Ammenities from "./Ammenities";
import MaxGuests from "./MaxGuests";
import ImageUpload from "./ImageUpload";
import Description from "./Description";
import ExtraInfo from "./ExtraInfo";
import CheckInCheckOut from "./CheckInCheckOut";
import { Navigate } from "react-router-dom";
import Loader from "../../../loader/Loader";
import LoaderContext from "../../../../context/loader/LoaderContext";


const NewAccomodation = () => {
  const imageUpload = useRef();
  const {loader, setLoader} = useContext(LoaderContext);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [maxGuests, setMaxGuests] = useState(0);
  const [ammenities, setAmmenities] = useState([]);
  const [description, setDescription] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [imgLink, setImgLink] = useState("");
  const [redirect, setRedirect] = useState(null);


  const handleImgLinkUpload = async () => {
    setLoader(true);
    if (imgLink === "") {
      alert("Please enter a valid link");
      return;
    }
    if(uploadedImages.length === 10){
      alert("Cannot add more than 10 images.");
      return;
    }
    try {
      const { data } = await axios.post("/upload_by_link", { imgLink });
      if(data){
        setUploadedImages((prev) => {
          return [...prev, data];
        });
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
    if(uploadedImages.length >= 10){
      alert("Cannot add more than 10 images.");
      return;
    }
    const files = event.target.files;
    const imgData = new FormData();

    for(let i=0; i<files.length; i++) {
      imgData.append('photos', files[i]);
    }
    try {
      const { data } = await axios.post("/upload_by_img", imgData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Upload successful!");
      
      setUploadedImages(prev => {return [...prev, ...data]});
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
        const uploadedImgCopy = uploadedImages.filter(item=> item!== filename)
        alert("Image delete successfully");
        setUploadedImages([...uploadedImgCopy]);
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
      setAmmenities([...ammenities, value]);
    } else {
      setAmmenities(ammenities.filter((v) => v !== value));
    }
  };

  const handleAccomodationUpload = async (e) => {
    e.preventDefault();
    setLoader(true);

    const titleCopy = title.trim().toLowerCase();
    const descriptionCopy = description.trim().toLowerCase();
    const extraInfoCopy = extraInfo.trim().toLowerCase();
    const addressCopy = address.trim().toLowerCase();
    if(titleCopy==='' || descriptionCopy==='' || ammenities.length===0 || extraInfoCopy==='' || uploadedImages.length===0 || addressCopy==='' || maxGuests===0 || checkIn==='' || checkOut===''){
      alert("Please fill all the required fields");
      return;
    }

   const {data} = await axios.post('/upload_accomodation', {title: titleCopy, description: descriptionCopy, extraInfo: extraInfoCopy, address: addressCopy, maxGuests, photos:uploadedImages, checkIn, checkOut, ammenities});
   if(data) setRedirect('/account');
   setLoader(false);
   alert("Accomodation uploaded successfully")

  };

  if(loader) return <Loader />


  if(redirect){
    return <Navigate to={redirect} />
  } 

  return (
    <>
      <div className="lg:w-2/3 mx-auto">
        <form onSubmit={handleAccomodationUpload} className="flex flex-col gap-8">
          <Title title={title} setTitle={setTitle} />
          <Address address={address} setAddress={setAddress} />
          <Ammenities handleAmmenities={handleAmmenities} />
          <MaxGuests maxGuests={maxGuests} setMaxGuests={setMaxGuests}/>
          <ImageUpload setImgLink={setImgLink} imgLink={imgLink} handleImageUpload={handleImageUpload} handleImgLinkUpload={handleImgLinkUpload} imageUpload={imageUpload} removeImg={removeImg} uploadedImages={uploadedImages} />
          <Description description={description} setDescription={setDescription} />
          <ExtraInfo extraInfo={extraInfo} setExtraInfo={setExtraInfo} />
          <CheckInCheckOut checkIn={checkIn} checkOut={checkOut} setCheckIn={setCheckIn} setCheckOut={setCheckOut} />

          <button type="submit" value="submit" className="primary">
            Submit
          </button>
        </form>
      </div>
      
    </>
  );
};

export default NewAccomodation;
