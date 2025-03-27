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
const { getStorage } = require("firebase/storage");
const { ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const { initializeApp } = require("firebase/app");
const config = require("./firebaseConfig");

require("dotenv").config();

const app = express();
initializeApp(config.firebaseConfig);
const storage = getStorage();
const upload = multer({ storage: multer.memoryStorage() });

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Connection Failed:", err));

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.get("/", (req, res) => res.json({ message: "API is working!" }));

app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ error: "Email already registered" });

        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, 10),
        });

        res.json(userDoc);
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Registration failed" });
    }
});

module.exports = app;
