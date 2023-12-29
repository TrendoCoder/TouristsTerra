import React, { useState } from "react";
import PreviewServiceProvider from "../previewserviceprovider/previewServiceProvider";

const ServiceProviders = ({ serviceProvider }) => {
  const [search, setSearch] = useState("");
  const [selectedRequestFor, setSelectedRequestFor] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [showPreview, setShowPreview] = useState(false);
  const [selectedSP, setSelectedSP] = useState(null);

  const handlePreviewClick = (SP) => {
    setSelectedSP(SP);
    setShowPreview(true);
  };

  return (
    <div id="admin-list-of-user-container">
      <div id="admin-list-of-user-container-top">
        <h2>All Service Providers Data</h2>
        <input
          type="text"
          placeholder="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      
      </div>
      <div id="admin-list-of-user-container-list">
        <table>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Cnic</th>
            <th>City</th>
            <th>Experience</th>
            <th>Languages</th>
            <th>  <select
          value={selectedRequestFor}
          onChange={(e) => setSelectedRequestFor(e.target.value)}
          style={{ marginLeft: "10px", backgroundColor: "transparent", outline:"none"}}
        >
          <option style={{backgroundColor:"#0F4157", color:"white"}}  value="">Request For</option>
          <option style={{backgroundColor:"#0F4157", color:"white"}} value="Accommodation Provider">Accommodation</option>
          <option style={{backgroundColor:"#0F4157", color:"white"}} value="Transport">Transport</option>
          <option style={{backgroundColor:"#0F4157", color:"white"}} value="Blog">Blog</option>
        </select></th>
            <th>Id Card front Pic</th>
            <th>Id Card Back Pic</th>
            <th></th>
          </tr>
          {serviceProvider ? (
            serviceProvider
              .filter((item) => {
                const searchMatch =
                  search.toLowerCase() === "" ||
                  item.firstName.toLowerCase().includes(search.toLowerCase()) ||
                  item.lastName.toLowerCase().includes(search.toLowerCase());

                const requestForMatch =
                  selectedRequestFor === "" ||
                  item.requestFor === selectedRequestFor;

                return searchMatch && requestForMatch;
              })
              .map((serviceProvider, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{serviceProvider.firstName}</td>
                  <td>{serviceProvider.lastName}</td>
                  <td>{serviceProvider.email}</td>
                  <td>{serviceProvider.contact}</td>
                  <td>{serviceProvider.cnic}</td>
                  <td>{serviceProvider.city}</td>
                  <td>{serviceProvider.experience}</td>
                  <td>{serviceProvider.language}</td>
                  <td>{serviceProvider.requestFor}</td>
                  <td>
                    <img
                      src={
                        serviceProvider.idCardFrontImg
                          ? PF +
                            `/idcardfrontpic/${serviceProvider.idCardFrontImg}`
                          : PF + "/profileUpload.png"
                      }
                      alt={PF + "/profileUpload.png"}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "10px",
                        margin: "auto",
                      }}
                      crossOrigin="anonymous"
                    />
                  </td>
                  <td>
                    <img
                      src={
                        serviceProvider.idCardBackImg
                          ? PF +
                            `/idcardbackpic/${serviceProvider.idCardBackImg}`
                          : PF + "/profileUpload.png"
                      }
                      alt={PF + "/profileUpload.png"}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "10px",
                        margin: "auto",
                      }}
                      crossOrigin="anonymous"
                    />
                  </td>
                  <td onClick={() => handlePreviewClick(serviceProvider)}>
                    <u>Preview</u>
                  </td>
                </tr>
              ))
          ) : (
            <div>No Data is found.. Try again later</div>
          )}
        </table>
      </div>
      {showPreview && (
        <PreviewServiceProvider
          serviceProvider={selectedSP}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};

export default ServiceProviders;
