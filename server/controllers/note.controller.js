import { response } from "express";
import { Note } from "../models/note.model.js";

// response on home route
export const homepage = async (req, res) => {
  res.send("welcome homepage");
};

//controller function to create a new note data and save than inside the database
export const createNote = async (req, res) => {
  try {
    const notedata = new Note(req.body);
    if (!notedata.content) {
      return res
        .status(400)
        .json({ msg: "Note content is missing, fill first" });
    }
    const savedNote = await notedata.save().then((response) => {
      res.status(200).json({
        msg: `new note data save in database for:-- ${response.title}`,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

//controller function to get all note
export const getall = async (req, res) => {
  try {
    const allNote = await Note.find();
    res.status(200).json(allNote);
  } catch (error) {
    res.status(500).json(error);
  }
};

// controller function to search only one note
export const search = async (req, res) => {
  try {
    const keyword = req.params.id;
    const noteExists = await Note.findById(keyword);
    res.status(200).json(noteExists);
  } catch (error) {
    res.status(500).json(error);
  }
};

// controller to search data by name
export const searchByText = async(req, res)=>{
  try {
  const searchText = req.params.text;
  const foundData = await Note.find({title: searchText})
  if 
  (foundData.length === 0)
    {
    return res.status(200).json("not found")
  } 
    
    res.status(200).json(foundData)
  
} catch (error) {
  res.status(500).json(`searchByText error:--${error}`)
}

}


// controller to edit note
export const edit = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const updateNote = await Note.findByIdAndUpdate(id, body)
    console.log(updateNote);
    res.status(200).json({ msg: "note updated successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// controller to delete data by id
export const deleteNote = async (req, res) => {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id)
    if (!deleteNote) {
      return res.status(404).json({msg: "wrong id"})
    }
    // res.status(200).json({msg : `note--- ${deleteNote.title} --- deleted`})
    res.status(200).json({msg : `note--- ${deleteNote.title} --- deleted`})
  } catch (error) {
    console.log(error);
    
  }
    
     
  
  
}