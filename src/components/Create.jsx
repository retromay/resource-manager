import axios from "axios";
import React from "react";
import { useState } from "react";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Pick a type");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "https://67fe40f53da09811b17845a0.mockapi.io/api/test/crud",
      data: {
        title: title,
        description: description,
        type: type,
      },
    });
  };

  return (
    <>
      <div>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Title</legend>
          <input
            type="text"
            className="input"
            placeholder="Type here"
            onChange={(e) => setTitle(e.target.value)}
          />
          <p className="fieldset-label">Required</p>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Description</legend>
          <textarea
            className="textarea h-24"
            placeholder="Bio"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <p className="fieldset-label">Required</p>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Type</legend>
          <select
            defaultValue="Pick a type"
            className="select"
            onChange={(e) => setType(e.target.value)}
          >
            <option disabled={true}>Pick a type</option>
            <option>Article</option>
            <option>Video</option>
            <option>Tutorial</option>
          </select>
          <p className="fieldset-label">Required</p>
        </fieldset>
        <button className="btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
};

export default Create;
