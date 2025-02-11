const mongoose = require("mongoose");
const notesSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    content:{
        type: String,
    },
    pinned:{
        type: Boolean,
        default: false,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    
}, {timestamps: true});



module.exports = mongoose.model("Notes", notesSchema)