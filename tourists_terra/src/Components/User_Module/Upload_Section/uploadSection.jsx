import React from "react";

const UploadSection = () => {
  return (
    <div
      id="big-container"
      style={{
        width: "400px",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px #888888",
        padding: "20px",
      }}
    >
      <div>
        <h3 style={{ fontSize: "24px", fontWeight: "bold", margin: "0" }}>
          Express your thoughts?
        </h3>
      </div>
      <hr style={{ margin: "20px 0", border: "none", borderBottom: "1px solid #e4e6eb" }} />
      <div>
        <div>
          <button style={{ marginRight: "10px" }}>Upload Photo</button>
          <button>Upload tour video</button>
        </div>
      </div>
    </div>
  );
};

export default UploadSection;
