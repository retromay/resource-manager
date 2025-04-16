import React from "react"; // Import React library
import { useEffect, useState } from "react"; // Import hooks for lifecycle and state management
import axios from "axios"; // Import axios for HTTP requests
import { useNavigate } from "react-router-dom"; // Import navigation hook

/**
 * Update Component
 * This component allows users to update existing records
 * It retrieves record data from localStorage and submits updates to the API
 */

const Update = () => {
  // State variables to store form field values
  const [title, setTitle] = useState(""); // Title state
  const [description, setDescription] = useState(""); // Description state
  const [type, setType] = useState(""); // Type state
  const [id, setId] = useState(""); // ID state for the record being updated
  const [isLoading, setIsLoading] = useState(false); // Loading state for form submission

  // Initialize the navigation function
  const navigate = useNavigate();

  /**
   * useEffect hook to load data from localStorage when component mounts
   * This retrieves the previously stored record information
   */

  useEffect(() => {
    // Get values from localStorage and set them to state
    setTitle(localStorage.getItem("title") || "");
    setDescription(localStorage.getItem("description") || "");
    setType(localStorage.getItem("type") || "");
    setId(localStorage.getItem("id") || "");
  }, []); // Empty dependency array means this runs once on mount

  /**
   * Handle form submission for updating the record
   * @param {Event} e - The form submission event
   */

  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const id = localStorage.getItem("id");

    // Validate that we have an ID
    if (!id) {
      console.error("No ID found in localStorage");
      alert("Unable to update: record ID not found");
      return;
    }

    try {
      setIsLoading(true); // Set loading state to disable button

      // Send PUT request to update the record
      await axios({
        method: "put",
        url: `https://67fe40f53da09811b17845a0.mockapi.io/api/test/crud/${id}`,
        data: {
          title,
          description,
          type,
        },
      });

      // Clear localStorage items as they're no longer needed
      localStorage.removeItem("id");
      localStorage.removeItem("title");
      localStorage.removeItem("description");
      localStorage.removeItem("type");

      // Navigate back to home page on success
      navigate("/");
    } catch (error) {
      console.error("Error updating record:", error);
      alert("Failed to update record. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state regardless of outcome
    }
  };

  return (
    // Main container with flex for centering
    <div className="flex justify-center items-center min-h-screen">
      {/* Card container with fixed width and styling */}
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        {/* Form title */}
        <h2 className="text-2xl font-bold mb-6 text-center">Update Record</h2>

        {/* Form with onSubmit handler */}
        <form onSubmit={handleUpdate}>
          {/* Title field */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Title</legend>
            <input
              type="text"
              className="input w-full"
              placeholder="Type here"
              value={title || ""} // Handle null/undefined with fallback
              required={true}
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
              value={description || ""} // Handle null/undefined with fallback
              required={true}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <p className="fieldset-label">Required</p>
          </fieldset>

          {/* Type selection dropdown */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Type</legend>
            <select
              className="select w-full"
              value={type || ""} // Handle null/undefined with fallback
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

          {/* Button container for centering */}
          <div className="flex justify-center mt-6 space-x-4">
            {/* Submit button with loading state */}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update"}
            </button>

            {/* Cancel button */}
            <button type="button" className="btn" onClick={() => navigate("/")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
