const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String
});

const UserModel = new mongoose.model("User", UserSchema);

module.exports = UserModel;