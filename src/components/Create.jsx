import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 Create Component
 * This component renders a form that allows users to create new entries
 * for the CRUD application. *
 */

const Create = () => {
  // State variables for form fields and loading state
  const [title, setTitle] = useState(""); // State for title input
  const [description, setDescription] = useState(""); // State for description textarea
  const [type, setType] = useState(""); // State for type dropdown (empty initial value)
  const [isLoading, setIsLoading] = useState(false); // State to track loading/submission status

  // Initialize navigation function from react-router
  const navigate = useNavigate();

  /**
   * Handle form submission
   * This function handles the form submission, sends the data to the API,
   * and redirects to the home page on success.
   *
   * @param {Event} e - The form submission event
   */

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Send POST request to the API with form data
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
      navigate("/"); // Navigate back to home page after successful submission
    } catch (error) {
      console.error("Error creating record:", error);
      // Handle error (e.g., show error message to user)
      // You can use a toast notification or alert to inform the user about the error
      // Show error to user
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <>
      {/* Main container with flex for centering */}
      <div className="flex justify-center items-center min-h-screen">
        {/* Card container with fixed width and styling */}
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          {/* Form title */}
          <h2 className="text-2xl font-bold mb-6 text-center">
            Create New Item
          </h2>

          {/* Form with onSubmit handler */}
          <form className="form" onSubmit={handleSubmit}>
            <fieldset className="fieldset">
              {/* Title field */}
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

            {/* Description field */}
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

            {/* Type dropdown field */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Type</legend>
              <select
                value={type}
                className="select w-full"
                required={true}
                onChange={(e) => setType(e.target.value)}
              >
                {/* Placeholder option - disabled and can't be selected */}
                <option value="" disabled>
                  Pick a type
                </option>
                <option value="Article">Article</option>
                <option value="Video">Video</option>
                <option value="Tutorial">Tutorial</option>
              </select>
              <p className="fieldset-label">Required</p>
            </fieldset>

            {/* Submit button container - centered */}
            <div className="flex justify-center gap-4 mt-6">
              {/* Submit button with dynamic text based on loading state */}
              <button
                className="btn btn-primary "
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>

              {/* Cancel button to return to main page */}
              <button
                className="btn"
                type="button"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
