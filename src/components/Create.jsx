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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await axios.post(
        "https://67fe40f53da09811b17845a0.mockapi.io/api/test/crud",
        {
          title,
          description,
          type,
        }
      );
      navigate("/");
    } catch (error) {
      console.error("Error creating record:", error);
      // Show error to user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Create New Item
          </h2>
          <form className="form" onSubmit={handleSubmit}>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Title</legend>
              <input
                type="text"
                required={true}
                className="input w-full"
                placeholder="Type here"
                onChange={(e) => setTitle(e.target.value)}
              />
              <p className="fieldset-label">Required</p>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Description</legend>
              <textarea
                className="textarea h-24 w-full"
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
                className="select w-full"
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
            <div className="flex justify-center mt-6">
              <button className="btn" type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
