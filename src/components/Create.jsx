import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    axios({
      method: "post",
      url: "https://67fe40f53da09811b17845a0.mockapi.io/api/test/crud",
      data: {
        title: title,
        description: description,
        type: type,
      },
    }).then(function () {
      navigate("/");
    });
  };

  return (
    <>
      <div>
        <form className="form" onSubmit={handleSubmit}>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Title</legend>
            <input
              type="text"
              required={true}
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
              required={true}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <p className="fieldset-label">Required</p>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Type</legend>
            <select
              value={type}
              className="select"
              required={true}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="" disabled>
                Pick a type
              </option>
              <option value="Article">Article</option>
              <option value="Video">Video</option>
              <option value="Tutorial">Tutorial</option>
            </select>
            <p className="fieldset-label">Required</p>
          </fieldset>
          <button className="btn" type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Create;
