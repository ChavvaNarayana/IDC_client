import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/DisplayPage.css";

function ImageContainer({ data, handleDelete }) {
  return (
    <div className="img-subcontainer">
      <div className="name_delButton">
        <div>
          <button
            className="delete-button"
            onClick={() => handleDelete(data._id)}
          >
            Delete
          </button>
        </div>
        <div>
          <h2>{data.name}</h2>
        </div>
      </div>
      <div>
        <img src={`http://localhost:8000/${data.photo}`} alt="" />
      </div>
    </div>
  );
}

function DisplayPage() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchImages = useCallback(async () => {
    const response = await axios.get("http://localhost:8000/newimage");
    const { data } = response.data;
    setImages(data.reverse());
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleFilter = useCallback(
    (event) => {
      setSearchQuery(event.target.value);
    },
    [setSearchQuery]
  );

  const filteredImages = useMemo(() => {
    if (!searchQuery) {
      return images;
    }
    return images.filter((image) =>
      image.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [images, searchQuery]);

  const handleAdd = () => {
    navigate("/form");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`http://localhost:8000/newimage/${id}`);
      toast.success("Image deleted", {
        position: "top-center",
      });
      fetchImages();
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="id-input">
          <div>
            <b>My Unsplash</b>
            <p>Chavva Narayana Reddy</p>
          </div>
          <div className="">
            <input
              className="search-box"
              placeholder={searchQuery ? "" : "Search by name"}
              value={searchQuery}
              onChange={handleFilter}
            />
          </div>
        </div>
        <button className="button" onClick={handleAdd}>
          Add a photo
        </button>
      </div>

      <div className="img-container">
        {filteredImages.map((image) => (
          <ImageContainer
            key={image._id}
            data={image}
            handleDelete={handleDelete}
          />
        ))}
      </div>

      <ToastContainer />
    </div>
  );
}

export default DisplayPage;
