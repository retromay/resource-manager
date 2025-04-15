import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [type, setType] = React.useState("Pick a type");
  const [id, setId] = React.useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setTitle(localStorage.getItem("title"));
    setDescription(localStorage.getItem("description"));
    setType(localStorage.getItem("type"));
    setId(localStorage.getItem("id"));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const id = localStorage.getItem("id");
    axios({
      method: "put",
      url: `https://67fe40f53da09811b17845a0.mockapi.io/api/test/crud/${id}`,
      data: {
        title: title,
        description: description,
        type: type,
      },
    }).then(function (response) {
      navigate("/");
    });
  };

  return (
    <>
      <div>
        <h2>Update</h2>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Title</legend>
          <input
            type="text"
            className="input"
            placeholder="Type here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <p className="fieldset-label">Required</p>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Description</legend>
          <textarea
            className="textarea h-24"
            placeholder="Bio"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <p className="fieldset-label">Required</p>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Type</legend>
          <select
            defaultValue="Pick a type"
            className="select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option disabled={true}>Pick a type</option>
            <option>Article</option>
            <option>Video</option>
            <option>Tutorial</option>
          </select>
          <p className="fieldset-label">Required</p>
        </fieldset>
        <button className="btn" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </>
  );
};

export default Update;
