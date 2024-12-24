import { FcTreeStructure } from "react-icons/fc";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import "./Note.css";
import axios from "axios";

// const currentPageUrl = window.location.href;

function Note({ data, index }) {
  const navigate = useNavigate();

  //function to delete note
  const handleDelete = () => {
    axios
      .delete(`http://localhost:3000/api/delete/${data._id}`)
      .then((res) => {
        console.log(res);
        toast.success(res.data.msg, { position: "top-left" });
      })

      .catch((err) => {
        console.log(err);
      });
  };

  //function to edit note
  const handleEdit = (e) => {
    navigate(`/edit/${data._id}`);
    console.log("edit page activated");
  };

  return (
    <div className="container" onDoubleClick={handleEdit}>
      <h3 className="title">{data.title}</h3>
      <p className="body">{data.content}</p>
      <div className="menu">
        <span>
          <TiEdit onClick={handleEdit} />
        </span>
        <span>
          <RiDeleteBin2Fill onClick={handleDelete} />
        </span>
        <span>
          <FcTreeStructure />
        </span>
        <span>
          {/* <FacebookShareButton url={currentPageUrl}>
            <FacebookIcon size={30} round={true} />
          </FacebookShareButton> */}
        </span>
        <span>
          <WhatsappShareButton url={"https://www.google.co.in/"}>
            <WhatsappIcon size={25} round={true} />
          </WhatsappShareButton>
        </span>
      </div>
    </div>
  );
}

export default Note;
