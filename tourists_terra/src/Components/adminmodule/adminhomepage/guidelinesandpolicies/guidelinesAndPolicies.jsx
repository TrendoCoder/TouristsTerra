import React, { useState } from "react";
import "./guidelinesandpolicies.css";
import axios from "axios";

const GuidelinesAndPolicies = ({guidelines}) => {
  const [guideline,setGuideline] = useState(guidelines?guidelines[0].guidelines:"");
  const updateGuidelines = async () => {
    guidelines
      ? await axios.put(
        `http://localhost:3001/api/admin/guidelines-and-policies/${guidelines[0]._id}`,
        { guidelines: guideline }
      )
      : await axios.post(
          `http://localhost:3001/api/admin/guidelines-and-policies/`,
          { guidelines: guideline }
        );
        alert("successfully posted");
    window.location.reload();
  };

  return (
    <div id="guidelines-main">
      <h1>GUIDELINES AND POLICIES</h1>
      <div id="guidelines-container">
        <textarea
          name="guideline"
          value={guideline || ""}
          cols="80"
          rows="14.5"
          onChange={(e) => setGuideline(e.target.value)}
        ></textarea>
      </div>
      <button onClick={updateGuidelines}>
  {guidelines && guidelines[0]._id ? "Update" : "Upload"}
</button>

    </div>
  );
};

export default GuidelinesAndPolicies;
