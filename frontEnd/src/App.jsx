import { Link } from "react-router-dom";
import "./App.css";
import { NoteComponent } from "./components/noteComponent/NoteComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import Note from "./components/note/Note";
import { IoMdAdd } from "react-icons/io";

function App() {
  const initialNote = [
    {
      title: "manual title",
      content: "manual content",
    },
  ];
  const [notes, setNotes] = useState(initialNote);

  const Base_url = "https://noteapp-ubuntu-deployed-withserver.onrender.com";

  useEffect(() => {
    axios
      .get(
        // "http://localhost:3000/api/notes"
        `${Base_url}/api/notes`
      )
      .then((res) => {
        setNotes(res.data);
        // console.log(res.data);
      })

      .catch((err) => {
        console.log(`all data fetching err:- ${err}`);
      });
  }, [notes]);

  return (
    <>
      <div className="navBar">
        <h2>welcome to Note Book by Dharmendra</h2>
      </div>
      <div className="mainContainer">
        <ul className="sidebar">
          <li>side menu</li>
          <li>side menu</li>
          <li>side menu</li>
          <li>side menu</li>
          <li>side menu</li>
          <li>side menu</li>
          <li>side menu</li>
        </ul>
        <div className="notes">
          <div className="new-note">
            <Link to={"/notes"}>
              <button>
                <IoMdAdd />
              </button>
            </Link>
          </div>
          <div className="note-container">
            {notes.map((note, index) => {
              return <Note data={note} key={index} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
