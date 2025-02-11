const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, "Invalid email address"], // Regex for email validation
    },
    password:{
        type: String,
        required: true,
        minlength: [3, "Password must be at least 3 characters long"],
    },
    notes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notes",
    }]
});

module.exports =  mongoose.model("User", userSchema)