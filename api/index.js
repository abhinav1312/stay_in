const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User.js");
const Accomodation = require("./models/Accomodation.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { getStorage } = require('firebase/storage');
const { ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
// import { initializeApp } from "firebase/app";
const {initializeApp} = require('firebase/app')
// import config from './firebaseConfig'
const config = require('./firebaseConfig');
// initialize firebase configuration
initializeApp(config.firebaseConfig);

// initialize cloud storage
const storage = getStorage();

// multer as middleware to grab photo uploads
const upload = multer({storage: multer.memoryStorage()})


require("dotenv").config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;
const photoMiddleware = multer({ dest: "uploads" });

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection established");
  })
  .catch((err) => {
    console.log(("Connection unsuccessfull", err));
  });

app.get('/', async(req, res)=>{
  try{
    const allAccomodations = await Accomodation.find();
    res.json(allAccomodations);
  }
  catch(error){
    console.log(error);
    console.log("Some error occured");
    res.json(null);
  }
})

app.get("/test", (req, res) => {
  res.json("Test ok");
});
// p87SFzmcULG7NNhf
// gLQorHVhYwkP3nr9
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const userSnapShot = await User.find({email})
  if(userSnapShot){
    res.json(null);
  }
  const userDoc = await User.create({
    name,
    email,
    password: bcrypt.hashSync(password, bcryptSalt),
  });
  res.json(userDoc);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { name: userDoc.name, email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("Password is incorrect");
    }
  } else {
    res.json("User does not exist, please register again");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) throw err;
      res.json(userData);
    });
  } else {
    res.json(null);
  }
});

app.get('/accomodation_list', async(req, res)=>{
  const {token} = req.cookies
  jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
    if(err) throw err;
    const userAccomodationList = await Accomodation.find({owner: userData.id})
    res.json(userAccomodationList);
  })
})

app.get('/accomodation_list/:id', (req, res)=>{
  const {id} = req.params;
  const {token} = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
    if(err){
      // res.json(null);
      throw err;
    };
    const accomodationData = await Accomodation.find({owner: userData.id, _id: id})
    res.json(accomodationData);
  })
})

app.get('/accomodation/:id', async (req, res)=>{
  const {id} = req.params;
  console.log(id);
  try{
    const accomodationDoc = await Accomodation.findById(id);
    res.json(accomodationDoc);
  }
  catch(err){
    res.json(null);
    console.log(err);
    console.log("Error occured");
  }
})

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload_by_link", async (req, res) => {
  try {
    const { imgLink } = req.body;
    const newName = "photo" + Date.now() + ".jpg";
    // res.json({imgLink})
    await imageDownloader.image({
      url: imgLink,
      dest: __dirname + "/uploads/" + newName,
    });
    res.json(newName);
  } catch (error) {
    console.log(error);
    res.status(404).json(null);
  }
});

app.post(
  "/upload_by_img",
  photoMiddleware.array("photos", 100),
  async (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      console.log("Path: ", path, "  Original NAme: ", originalname)
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace("uploads/", ""));
    }
    res.json(uploadedFiles);
  }
);

// app.post(
//   "/upload_by_img",
//   upload.array("photos", 100),
//   async (req, res) => {
//     const uploadedFiles = [];
//     for (let i = 0; i < req.files.length; i++) {
//       const { originalname } = req.files[i];
//       let newName = originalname.replace(/\s/g, "").toLowerCase();
//       newName = newName.split('.');
//       newName = newName[0]+Date.now();
//       console.log("NewNAmeL ",newName);
//       const storageRef = ref(storage, `files/${newName}`)
//       // create file metadata including content-type
//       const metadata = { contentType: req.files[i].mimetype }
//       //upload
//       const snapshot = await uploadBytesResumable(storageRef, req.files[i].buffer, metadata);

//       // dowloadURL 
//       const downloadURL = await getDownloadURL(snapshot.ref);
      
//       // fs.renameSync(path, newPath);
//       uploadedFiles.push(downloadURL);
//       console.log("DownloadURL: ", downloadURL)
//     }
//     res.json(uploadedFiles);
//   }
// );

app.post("/delete_img", (req, res) => {
  const { filename } = req.body;
  const imgPath = path.join(__dirname, "uploads", filename);
  fs.access(imgPath, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(500).json(null);
    } else {
      fs.unlink(imgPath, (err) => {
        if(err){
          res.status(500).json(null);
        }
        res.status(200).json("Deleted successfuly from folder")
      });
    }
  });
});

app.post("/upload_accomodation", (req, res) => {
  const {
    title,
    description,
    address,
    perks,
    extraInfo,
    maxGuests,
    checkIn,
    checkOut,
    photos,
    pricePerNight
  } = req.body;
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    try {
      const details = await Accomodation.create({
        owner: data.id,
        title,
        address,
        description,
        perks,
        extraInfo,
        maxGuests,
        checkIn,
        checkOut,
        photos,
        pricePerNight,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.json(details);
    } catch (error) {
      res.status(500).json(null);
      throw error;
    }
  });
});

app.post('/update_accomodation', (req, res)=>{
  const {
    id,
    title,
    description,
    address,
    perks,
    extraInfo,
    maxGuests,
    checkIn,
    checkOut,
    photos,
    pricePerNight
  } = req.body;
  const {token} = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err,userData)=>{
    if(err){
      res.json(null);
      throw err;
    }
    else{
      try{
        const updatedDoc = await Accomodation.findByIdAndUpdate(
          id,
          { title,
            description,
            address,
            perks,
            extraInfo,
            maxGuests,
            checkIn,
            checkOut,
            photos,
            pricePerNight,
            updatedAt: new Date()
          }, 
          { new: true}
        )
        console.log(updatedDoc)
        res.json(updatedDoc);
      }
      catch(error){
        console.log(error);
        res.json(null);
      }
    }
  })
})

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
