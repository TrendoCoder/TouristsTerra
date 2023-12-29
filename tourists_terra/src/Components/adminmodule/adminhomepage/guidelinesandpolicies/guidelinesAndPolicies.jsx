import React, { useEffect, useState } from "react";
import "./guidelinesandpolicies.css";
import axios from "axios";

const GuidelinesAndPolicies = () => {
  const [guideline, setGuidelines] = useState(null);
  const [isPrevGuidelines, setIsPrevGuidelines] = useState(false);

  useEffect(() => {
    const getGuidelinesAndPolicies = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/admin/guidelines-and-policies/"
        );
        setGuidelines(res.data);
        setIsPrevGuidelines(!!res.data); 
      } catch (err) {
        setIsPrevGuidelines(false);
      }
    };
    getGuidelinesAndPolicies();
  }, []);
  

  const updateGuidelines = async () => {
    isPrevGuidelines
      ? await axios.put(
          `http://localhost:3001/api/admin/guidelines-and-policies/${guideline._id}`,
          { guidelines: guideline }
        )
      : await axios.post(
          `http://localhost:3001/api/admin/guidelines-and-policies/`,
          { guidelines: guideline }
        );
    window.location.reload();
  };
  console.log(guideline);

  return (
    <div id="guidelines-main">
      <h1>GUIDELINES AND POLICIES</h1>
      <div id="guidelines-container">
        <textarea
          name="guideline"
          defaultValue={guideline}
          cols="80"
          rows="14.5"
          onChange={(e) => setGuidelines(e.target.value)}
        ></textarea>
      </div>
      <button onClick={updateGuidelines}>
        {isPrevGuidelines ? "Update" : "Upload"}
      </button>
    </div>
  );
};

export default GuidelinesAndPolicies;
