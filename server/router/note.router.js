import express from "express";
const route = express.Router();
import {
  // homepage,
  createNote,
  getall,
  search,
  edit,
  deleteNote,
  test,
  searchByText,
} from "../controllers/note.controller.js";

// creating route
// route.get("/", homepage);
route.get("/test", test);
route.post("/create", createNote);
route.get("/notes", getall);
// route.get("/search/:id", search)
route.put("/edit/:id", edit);
route.delete("/delete/:id", deleteNote);
route.get("/search/:id", search);
export default route;
