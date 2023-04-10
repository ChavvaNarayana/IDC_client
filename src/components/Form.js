import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Form.css";

const Form = () => {
  const [data, setData] = useState({
    photo: "",
    name: "",
  });

  const navigate = useNavigate();
  const formDataRef = useRef(new FormData());

  useEffect(() => {
    fetchData();
  }, []);

   let [postFormdata, setPostFormData] = useState([])
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/newimage");
      console.log(response.data.data);
      setPostFormData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const postData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/newimage",
        formDataRef.current,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(response);
      fetchData();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (data.name && data.photo) {
      formDataRef.current.append("photo", data.photo);
      formDataRef.current.append("name", data.name);
      await postData();
    } else {
      toast.error("All fields required", {
        position: "top-center",
      });
    }
  };

  return (
    <div>
      <form className="form-container" onSubmit={submitHandler}>
        <h2>Add a new photo</h2>
        <div>
          <div>
            <label htmlFor="">Label</label>
          </div>
          <input
            type="text"
            id="author-box"
            placeholder="provide title for your image"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div>
          <div>
            <label htmlFor="">Photo</label>
          </div>

          <input
            type="file"
            id="formFile"
            name="photo"
            onChange={(e) => setData({ ...data, photo: e.target.files[0] })}
          />
        </div>
        <div className="btns">
          <button
            className="can-btn"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </button>
          <button className="sub-btn" type="submit">
            Post
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Form;
