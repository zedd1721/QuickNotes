const notesModel = require('../models/notesModel');

module.exports.createNote = async function(req, res){
    try{
        const {title, content, pinned} = req.body;
        const owner = req.user;
        if(!title){
            return res.status(400).json({message: "Title is required"});
        }
        const newNote = await notesModel.create({
            title,
            content,
            pinned: pinned || false,
            owner: owner._id,
        });
        return res.status(201).json({message: "Note created", note: newNote});

    }catch(err){
        return res.status(500).json({message: `Something went wrong: ${err.message}`});
    }
}