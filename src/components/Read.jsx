/**
 * Read Component
 *
 * This component renders a list of records with filtering and search capabilities.
 * It includes functionality for creating, updating, and deleting records.
 */

import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]); // State to store fetched data
  const [filteredData, setFilteredData] = useState([]); // State to store filtered data
  const [searchTerm, setSearchTerm] = useState(""); //  State for search input
  const [typeFilter, setTypeFilter] = useState(""); // State for type filter

  // Initialize navigation hook for routing
  const navigate = useNavigate();

  // Function to truncate text to a specific length
  const truncateText = (text, maxLength) => {
    if (!text) return ""; // Handle empty text
    if (text.length <= maxLength) return text; // Return original if under max length
    return text.slice(0, maxLength) + "..."; // Truncate and add ellipsis
  };

  // Fetch data from API
  const getData = async () => {
    try {
      const response = await axios.get(
        "https://67fe40f53da09811b17845a0.mockapi.io/api/test/crud"
      );
      setData(response.data); // Update main data state
      setFilteredData(response.data); // Initialize filtered data with all records
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  /**
   * Effect hook to load data when component mounts
   * Empty dependency array ensures it only runs once on mount
   */

  useEffect(() => {
    getData(); // Load data on component mount
  }, []);

  // Filter data when search term or type filter changes
  useEffect(() => {
    const results = data.filter((item) => {
      // Check if title matches search term (case-insensitive)
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Check if type matches selected filter or if no filter is selected
      const matchesType = typeFilter === "" || item.type === typeFilter;

      // Item must match both conditions to be included
      return matchesSearch && matchesType;
    });

    setFilteredData(results); // Update filtered data state
  }, [searchTerm, typeFilter, data]); // Re-run when these dependencies change

  /**
   * Navigates to create page for adding new records
   */
  const handleCreate = () => {
    navigate("/create");
  };

  /**
   * Navigates to update page and stores item data in localStorage
   * @param {string} id - Record ID
   * @param {string} title - Record title
   * @param {string} description - Record description
   * @param {string} type - Record type
   */
  const handleUpdate = (id, title, description, type) => {
    navigate("/update"); // Navigate to update page

    // Store record data in localStorage for the update component to use
    localStorage.setItem("id", id);
    localStorage.setItem("title", title);
    localStorage.setItem("description", description);
    localStorage.setItem("type", type);
  };

  /**
   * Deletes a record after confirmation
   * @param {string} id - ID of the record to delete
   */
  const handleDelete = async (id) => {
    // Show confirmation dialog before deleting
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        // Send delete request to API
        await axios({
          method: "delete",
          url: `https://67fe40f53da09811b17845a0.mockapi.io/api/test/crud/${id}`,
        });
        getData(); // Refresh data after successful deletion
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  // Get unique types for dropdown
  const uniqueTypes = ["", ...new Set(data.map((item) => item.type))];

  return (
    <div className="container mx-auto p-4">
      {/* Header section with title and create button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Records Manager</h1>
        <button className="btn btn-primary" onClick={handleCreate}>
          Create New
        </button>
      </div>

      {/* Search and filter section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search input */}
        <div className="form-control flex-1">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search by title..."
              className="input input-bordered w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Clear search button - only shows when there's a search term */}
            {searchTerm && (
              <button
                className="btn btn-square"
                onClick={() => setSearchTerm("")}
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Type filter dropdown */}
        <div className="form-control md:w-64">
          <select
            className="select select-bordered w-full"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            {uniqueTypes
              .filter((type) => type !== "")
              .map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Type</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {filteredData.length > 0 ? (
              // Map through filtered data if records exist
              filteredData.map((item) => (
                <tr key={item.id}>
                  <th>{item.id}</th>
                  <td>{item.title}</td>

                  {/* Truncated description with full text in title attribute (tooltip on hover) */}
                  <td title={item.description} className="max-w-xs">
                    {truncateText(item.description, 50)}
                  </td>
                  <td>{item.type}</td>

                  {/* Edit button */}
                  <td>
                    <button
                      className="btn btn-soft btn-info btn-xs sm:btn-sm"
                      onClick={() =>
                        handleUpdate(
                          item.id,
                          item.title,
                          item.description,
                          item.type
                        )
                      }
                    >
                      Edit
                    </button>
                  </td>

                  {/* Delete button */}
                  <td>
                    <button
                      className="btn btn-soft btn-error btn-xs sm:btn-sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              // Show message when no records match the filter criteria
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No records found matching your search criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Read;
