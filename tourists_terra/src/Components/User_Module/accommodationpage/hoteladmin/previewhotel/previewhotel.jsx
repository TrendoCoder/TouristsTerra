import React from 'react'
import "./previewhotel.css"
const PreviewHotel = ({hotel, onClose}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div id="preview-hotel">
      <div id="preview-hotel-big-container">
        <div id="preview-close-btn" onClick={onClose}>
          &times;
        </div>
        <div id="preview-hotel-details">
          <div id="preview-hotel-details-img">
            {" "}
            <img
              src={
                hotel.photos
                  ? PF + `/hotelimgs/${hotel.photos}`
                  : PF + "/profileUpload.png"
              }
              alt={PF + "/profileUpload.png"}
              crossOrigin="anonymous"
            />
          </div>

          <div id="preview-hotel-all-details">
            <div>
              <div
                id="preview-hotel-all-details-row"
                style={{ backgroundColor: "#0F4157" }}
              >
                <p>
                  <strong>Hotel Name:</strong>
                </p>
                <p>{hotel.name}</p>
              </div>
              <div id="preview-hotel-all-details-row">
                <p>
                  <strong>Title:</strong>
                </p>
                <p>{hotel.title}</p>
              </div>
              <div id="preview-hotel-all-details-row">
                <p>
                  <strong>Hotel Type:</strong>
                </p>
                <p>{hotel.type}</p>
              </div>
              <div id="preview-hotel-all-details-row">
                <p>
                  <strong>City:</strong>
                </p>
                <p>{hotel.city}</p>
              </div>

              <div id="preview-hotel-all-details-row">
                <p>
                  <strong>Address:</strong>
                </p>
                <p>{hotel.address}</p>
              </div>
              <div id="preview-hotel-all-details-row">
                <p>
                  <strong>Total Rooms:</strong>{" "}
                </p>
                <p>{hotel.rooms.length}</p>
              </div>
              <div id="preview-hotel-all-details-row">
                <p>
                  <strong>Cheapest Price:</strong>
                </p>
                <p>{hotel.cheapestPrice}</p>
              </div>

              <div id="preview-hotel-all-details-row">
                <p>
                  <strong>Featured: </strong>{" "}
                </p>
                <p>{hotel.featured ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>
        </div>
        <div id="preview-hotel-details-extras">
          <p>
            <strong>Room Description: </strong>{" "}
          </p>
          <p
            style={{
              border: "2px solid #0F4157",
              padding: "5px 8px",
              borderRadius: "5px",
            }}
          >
            {hotel.hotelDescription
              ? hotel.hotelDescription
              : "No Description available"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PreviewHotel