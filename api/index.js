const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User.js')
const Accomodation = require('./models/Accomodation.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret =  process.env.JWT_SECRET
const photoMiddleware = multer({dest: 'uploads'})

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))


mongoose.connect(process.env.MONGO_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    ).then(()=>{
        console.log(("Connection established"))
    }
    ).catch((err)=>{console.log(("Connection unsuccessfull", err))})


app.get('/test', (req, res) =>{
    res.json("Test ok")
})
// p87SFzmcULG7NNhf
// gLQorHVhYwkP3nr9
app.post('/register',async  (req, res) =>{
    const {name, email, password} = req.body;
    const userDoc = await User.create({
        name,
        email, 
        password: bcrypt.hashSync(password, bcryptSalt)
    })
    res.json(userDoc);
})

app.post('/login', async (req, res) =>{
    const {email, password} = req.body;
    const userDoc = await User.findOne({email});
    if(userDoc){
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if(passOk){
            jwt.sign({name: userDoc.name, email: userDoc.email, id: userDoc._id}, jwtSecret, {}, (err, token)=>{
                if(err) throw err;
                res.cookie('token', token).json(userDoc);
            })
        }
        else{
            res.status(422).json("Password is incorrect")
        }
    }
    else{
        res.json("User does not exist, please register again")
    }
})

app.get('/profile', (req, res) => {
    const {token} =  req.cookies;
    if(token){
        jwt.verify(token, jwtSecret, {}, (err, userData)=>{
            if(err) throw err;
            res.json(userData);
        })
    }
    else{
        res.json(null);
    }
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
})

app.post('/upload_by_link', async (req, res)=>{
    try{
        const {imgLink} = req.body;
        const newName = 'photo' + Date.now() + '.jpg';
        // res.json({imgLink})
        await imageDownloader.image({url: imgLink, dest: __dirname + '/uploads/' + newName})   
        res.json(newName)
    }catch(error){
        res.status(404).json(null);
    }
})

app.post('/upload_by_img', photoMiddleware.array('photos', 100) , async (req, res) => {
    const uploadedFiles = [];
    for(let i = 0; i < req.files.length; i++) {
        const {path, originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads/', ''));    
    }
    res.json(uploadedFiles);
})

app.post('/delete_img', (req, res)=>{
    const {filename} = req.body;
    const imgPath = path.join(__dirname, 'uploads', filename)
    fs.access(imgPath, fs.constants.F_OK, (err) => {
        if (err) {
          res.status(400).json(null);
        } else {
           fs.unlink(imgPath, (err) => {
        if (err) {
            res.status(500).json(null);
        }
        res.status(200).json("Deleted successfully");
    });
        }
      });
})

app.post('/upload_accomodation',  (req, res)=>{
    const {title, description, ammenities, extraInfo, maxGuests, checkIn, checkOut, photos} = req.body;
    const {token} = req.cookies
    jwt.verify(token, jwtSecret, {}, async (err, data)=>{
        if(err){
            console.log(err);
            return;
        }
        try{
            const details = await Accomodation.create({
                owner: data.id, title, description, perks: ammenities, extraInfo, maxGuests, checkIn, checkOut, photos, createdAt: new Date(), updatedAt: new Date()
            })
            res.json(details);

        }catch(error){
            console.log(error);
            res.json(null);
        }
    })
})

app.listen(4000, ()=>{
    console.log("Server listening on port 4000")
});