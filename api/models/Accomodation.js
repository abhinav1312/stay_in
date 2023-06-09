const mongoose = require('mongoose');

const accomodationSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String,
    address: {
        houseNo: String,
        city: String,
        state: String,
        country: String
    },
    photos: [String],
    perks: [String],
    description: String,
    extraInfo: String,
    checkIn: String,
    checkOut: String,
    maxGuests: Number,
    pricePerNight: Number,
    createdAt: Date,
    updatedAt: Date
});

const AccomodationModel = new mongoose.model('Accomodation', accomodationSchema);

module.exports = AccomodationModel;