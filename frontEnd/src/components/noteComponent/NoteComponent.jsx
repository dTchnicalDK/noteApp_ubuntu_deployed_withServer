import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "./NoteComponent.css";

//declaration of blanck object for initial value of "noteFields"
export const NoteComponent = () => {
  const initiaNote = {
    title: "",
    content: "",
  };

  //state declaration
  const [noteFields, setNoteFields] = useState(initiaNote);
  const navigate = useNavigate();

  //different functions
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setNoteFields({ ...noteFields, [name]: value });
    // console.log(noteFields);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!noteFields.title || !noteFields.content) {
      return console.log("enter title, or content first");
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/create",
        noteFields
      );
      // console.log(response.data.msg);
      toast.success(response.data.msg, { position: "top-left" });
      navigate("/home");
    } catch (error) {
      console.log(`form submit error:- ${error}`);
    }
    // console.log(noteFields);
  };
  const handleBack = (e) => {
    e.preventDefault();
    let isConfirmed = confirm("unsaved data will be lost");
    if (isConfirmed) {
      console.log("bye, bye!");

      navigate("/home");
    } else {
      console.log("Thanks to return");
    }
  };

  return (
    <>
      <div className="note-container">
        <form className="noteForm" onSubmit={handleSubmit}>
          <div className="nav">
            <button onClick={handleBack}>back</button>
            <button type="submit">save</button>
          </div>
          <input
            type="text"
            placeholder="enter title here"
            name="title"
            onChange={changeHandler}
          />
          <div>
            <textarea
              id="content-body"
              name="content"
              rows={20}
              cols={30}
              onChange={changeHandler}
            ></textarea>
          </div>
        </form>
      </div>
    </>
  );
};
