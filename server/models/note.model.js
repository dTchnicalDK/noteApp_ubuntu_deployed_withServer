import mongoose from "mongoose";
const noteSchema = new mongoose.Schema({
    title: {type: String,
        required: true,
    },
    content: String
})
export const Note = mongoose.model("Note", noteSchema);