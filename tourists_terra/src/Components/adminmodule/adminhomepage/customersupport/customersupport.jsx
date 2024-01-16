import React, { useEffect, useState } from "react";
import axios from "axios";
const CustomerSupport = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [queries, setQueries] = useState(null);
  useEffect(() => {
    setLoading(false);
    getQueries();
  }, []);
  const getQueries = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/contactus/");
      setQueries(res.data);
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleComplete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/contactus/${id}`);
      alert("Successfully Answered");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div id="admin-list-of-user-container">
      <div id="admin-list-of-user-container-top">
        <h2>All Contact us Queries</h2>
        <input
          type="text"
          placeholder="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {loading ? (
        <div id="admin-list-of-user-container-list">
          <table>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Query</th>
              <th>Date</th>
              <th></th>
            </tr>
            {queries ? (
              queries
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.name.toLowerCase().includes(search.toLowerCase());
                })
                .map((querie, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{querie.name}</td>
                    <td>{querie.email}</td>
                    <td>{querie.message}</td>
                    <td>{querie.date}</td>
                    <td>
                      <button onClick={() => handleComplete(querie._id)}>
                        Done
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <div>No Data is found.. Try again later</div>
            )}
          </table>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CustomerSupport;
