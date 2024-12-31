import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useParams } from "react-router-dom";
import Base_url from "../utility/Base_url";
const Base_Url = Base_url();
import "./EditUi.css";

//declaration of blanck object for initial value of "noteFields"
export const EditUi = () => {
  const { id } = useParams();

  //state declaration
  const initiaNote = {
    title: "",
    content: "",
  };
  const [noteFields, setNoteFields] = useState(initiaNote);
  const navigate = useNavigate();

  //fetching previous data that is to be edited
  useEffect(() => {
    axios
      .get(
        // `http://localhost:3000/api/search/${id}`
        `${Base_Url}/api/search/${id}`
      )
      .then((data) => {
        setNoteFields(data.data);
      })
      .catch((err) => {
        console.log(`axios error: ${err}`);
      });
  }, []);

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
      const response = await axios.put(
        // `http://localhost:3000/api/edit/${id}`,
        `${Base_Url}/api/edit/${id}`,
        noteFields
      );
      console.log(response.data.msg);
      toast.success(response.data.msg, { position: "top-left" });
      navigate("/");
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
            value={noteFields.title}
            onChange={changeHandler}
          />
          <textarea
            name="content"
            id=""
            rows={20}
            cols={30}
            value={noteFields.content}
            onChange={changeHandler}
          ></textarea>
        </form>
      </div>
    </>
  );
};
