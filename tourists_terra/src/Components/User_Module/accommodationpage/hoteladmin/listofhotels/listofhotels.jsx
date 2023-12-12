import React, { useState } from 'react'
import "./listofhotels.css"
import PreviewHotel from '../previewhotel/previewhotel';
import DeleteHotel from '../deletehotel/deletehotel';
import EditHotel from '../edithotel/edithotel';
const ListOfHotels = ({hotels}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [showPreview, setShowPreview] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState(null);

    const handlePreviewClick = (hotel) => {
        setSelectedHotel(hotel);
        setShowPreview(true);
      };
      const handleEditClick = (hotel) => {
        setSelectedHotel(hotel);
        setShowEdit(true);
      };
      const handleDeleteClick = (hotel) => {
        setSelectedHotel(hotel);
        setShowDelete(true);
      };
  return (
    <div id="loah-container">
      <>
        {hotels &&
          hotels.map((item, i) => (
            <div id="list-all-hotels" key={i}>
              <div id="hotel-imgs">
                <img
                  src={item.photos ? (PF + `/hotelimgs/${item.photos}`): (PF+"/profileUpload.png")}
                  alt={PF+"/profileUpload.png"}
                  crossOrigin="anonymous"
                />
              </div>
              <div id="list-hotel-info">
                <h3>
                  Hotel_Id: <span id="h3-span">{item._id}</span>
                </h3>
                <h3>
                  Hotel Name: <span>{item.name}</span>
                </h3>
                <h3>
                  Title: <span>{item.title}</span>
                </h3>
               
                <h3>
                  Type: <span>{item.type}</span>
                </h3>
                <h3>
                  City: <span>{item.city}</span>
                </h3>
                <h3>
                  Rooms: <span>{item.rooms.length}</span>
                </h3>
                <h3>
                  Address: <span>{item.address}</span>
                </h3>
                <h3>
                  Price: <span>{item.cheapestPrice}</span>
                </h3>
              </div>
              <div id="room-rud">
        <button style={{backgroundColor:"lightGreen"}} onClick={() => handlePreviewClick(item)}>Preview</button>
        <button style={{backgroundColor:"#0F4157"}} onClick={() => handleEditClick(item)}>Edit</button>
        <button style={{backgroundColor:"orangeRed"}} onClick={() => handleDeleteClick(item)}>Delete</button>
      </div>
            </div>
          ))}
      </>
      {showPreview && (
        <PreviewHotel
          hotel={selectedHotel}
          onClose={() => setShowPreview(false)}
        />
      )}
      {showEdit &&
        (<EditHotel  hotel={selectedHotel}
          onClose={() => setShowEdit(false)}/>)
      }
      {showDelete &&
        (<DeleteHotel  hotel={selectedHotel}
          onClose={() => setShowDelete(false)}/>)
      }
  </div>
  )
}

export default ListOfHotels