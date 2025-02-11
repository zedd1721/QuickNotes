const notesModel = require("../models/notesModel");
const userModel = require("../models/userModel");

module.exports.createNote = async function (req, res) {
  try {
    const { title, content, pinned } = req.body;
    const owner = req.user;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const newNote = await notesModel.create({
      title,
      content,
      pinned: pinned || false,
      owner: owner._id,
    });
    await userModel.findByIdAndUpdate(owner._id, {
      $push: { notes: newNote._id }, //$push is a MongoDb Operator used to add element in an array.
      //$addToSet is also an operator but it doesn't allow duplication.
    });
    return res.status(201).json({ message: "Note created", note: newNote });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Something went wrong: ${err.message}` });
  }
};

module.exports.getNote = async function (req, res) {
  try {
    const userId = req.user._id;
    const notes = await notesModel
      .find({ owner: userId })
      .sort({ createdAt: -1 }); //CreatedAt: -1 -> Sorting in decending order
    return res.status(200).json({ notes });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Something went wrong: ${err.message}` });
  }
};

module.exports.updateNote = async function (req, res) {
  try {
    const { noteId } = req.params;
    const { title, content, pinned } = req.body;

    let note = await notesModel.findById(noteId);
    if (!note) {
      return res.status(404).json({ message: "Notes not found" });
    }
    // console.log(note.owner.toString() !== req.user._id.toString())
    if (note.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not owner" });
    }

    note.title = title || note.title;
    note.content = content || note.content;
    note.pinned = pinned || note.pinned;
    await note.save();

    return res
      .status(200)
      .json({ message: "Notes updated Successfully", note });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Something went wrong while updating, ${err.message}` });
  }
};

module.exports.deleteNote = async function (req, res) {
  try {
    const { noteId } = req.params;
    const userId = req.user._id;

    let note = await notesModel.findById(noteId);
    if (!note) {
      return res.status(404).json({ message: "Notes not found" });
    }
    if (note.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not owner" });
    }

    await notesModel.findByIdAndDelete(noteId);
    await userModel.findByIdAndUpdate(userId, {
      $pull: { notes: noteId },
    });
    return res.status(200).json({ message: "Deleted", success: true });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Something went wrong while updating, ${err.message}` });
  }
};
