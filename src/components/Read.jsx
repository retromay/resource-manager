import React, { use } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  function getData() {
    axios({
      method: "get",
      url: "https://67fe40f53da09811b17845a0.mockapi.io/api/test/crud",
    }).then(function (response) {
      setData(response.data);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  const handleClick = () => {
    navigate("/create");
  };

  return (
    <>
      <button className="btn btn-primary" onClick={handleClick}>
        Primary
      </button>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr key={item.id}>
                  <th>{item.id}</th>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.type}</td>
                  <td>
                    <button className="btn btn-soft btn-info btn-xs sm:btn-sm md:btn-md  ">
                      Edit
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-soft btn-error btn-xs sm:btn-sm md:btn-md  ">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Read;
