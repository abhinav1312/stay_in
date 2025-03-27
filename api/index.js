const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User.js");
const Accomodation = require("./models/Accomodation.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Setup Multer for file uploads
const upload = multer({ dest: "uploads" });

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;

// Ensure MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connection Established");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
  }
};

connectDB();


app.get("/", async (req, res) => {
  try {
    const allAccomodations = await Accomodation.find();
    res.json(allAccomodations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/test", (req, res) => {
  res.json({ message: "Test route is working!" });
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.json(userDoc);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
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
      res.status(422).json({ error: "Incorrect password" });
    }
  } else {
    res.status(404).json({ error: "User not found. Please register." });
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

app.get("/accomodation_list", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const userAccomodationList = await Accomodation.find({ owner: userData.id });
    res.json(userAccomodationList);
  });
});

app.get("/accomodation/:id", async (req, res) => {
  try {
    const accomodationDoc = await Accomodation.findById(req.params.id);
    res.json(accomodationDoc);
  } catch (err) {
    console.error("Accommodation fetch error:", err);
    res.status(404).json({ error: "Accommodation not found" });
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json({ message: "Logged out successfully" });
});

app.post("/upload_by_link", async (req, res) => {
  try {
    const { imgLink } = req.body;
    const newName = "photo" + Date.now() + ".jpg";

    await imageDownloader.image({
      url: imgLink,
      dest: path.join(__dirname, "uploads", newName),
    });

    res.json(newName);
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({ error: "Image upload failed" });
  }
});

app.post("/upload_by_img", upload.array("photos", 100), async (req, res) => {
  const uploadedFiles = req.files.map((file) => file.filename);
  res.json(uploadedFiles);
});

app.post("/delete_img", (req, res) => {
  const { filename } = req.body;
  const imgPath = path.join(__dirname, "uploads", filename);

  fs.access(imgPath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: "File not found" });
    }

    fs.unlink(imgPath, (unlinkErr) => {
      if (unlinkErr) {
        return res.status(500).json({ error: "File deletion failed" });
      }
      res.json({ message: "Deleted successfully" });
    });
  });
});

app.post("/upload_accomodation", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) return res.status(401).json({ error: "Unauthorized" });

    try {
      const details = await Accomodation.create({ owner: userData.id, ...req.body, createdAt: new Date() });
      res.json(details);
    } catch (error) {
      console.error("Accommodation creation error:", error);
      res.status(500).json({ error: "Accommodation creation failed" });
    }
  });
});
app.post("/update_accomodation", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) return res.status(401).json({ error: "Unauthorized" });

    try {
      const updatedDoc = await Accomodation.findByIdAndUpdate(req.body.id, { ...req.body, updatedAt: new Date() }, { new: true });
      res.json(updatedDoc);
    } catch (error) {
      console.error("Accommodation update error:", error);
      res.status(500).json({ error: "Update failed" });
    }
  });
});
module.exports = app;
