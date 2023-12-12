import React, { useState, useContext, useEffect } from "react";
import "./listofrooms.css";
import useFetch from "../../../../../Hooks/usefetch";
import { AuthContext } from "../../../../../Context/authcontext";
import axios from "axios";
import PreviewRoom from "../previewroom/previewroom";
import EditRoom from "../editroom/editroom";
import DeleteRoom from "../deleteroom/deleteroom";
const ListOfRooms = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const [rooms, setRooms] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { data, loading } = useFetch(
    `http://localhost:3001/api/hotels/?userId=${user._id}`
  );
  useEffect(() => {
    const getRooms = async () => {
      try {
        const rooms = await axios.get(
          `http://localhost:3001/api/rooms/?hotelId=${data}`
        );
        setRooms(rooms.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRooms();
  }, [0]);
  const handlePreviewClick = (room) => {
    setSelectedRoom(room);
    setShowPreview(true);
  };
  const handleEditClick = (room) => {
    setSelectedRoom(room);
    setShowEdit(true);
  };
  const handleDeleteClick = (room) => {
    setSelectedRoom(room);
    setShowDelete(true);
  };
  return (

      <div id="loah-container">
        {loading ? (
          "Loading please wait"
        ) : (
          <>
            {rooms &&
              rooms.map((item, i) => (
                <div>
                  <div id="list-all-hotels" key={i}>
                    <div id="hotel-imgs">
                      <img
                        src={
                          item.photos
                            ? PF + `/hotelimgs/roomimgs/${item.photos}`
                            : PF + "/profileUpload.png"
                        }
                        alt={PF + "/profileUpload.png"}
                        crossOrigin="anonymous"
                      />
                    </div>
                    <div id="list-hotel-info">
                      <h3>
                        Room_Id: <span id="h3-span">{item._id}</span>
                      </h3>
                      <h3>
                        Room Title: <span>{item.title}</span>
                      </h3>
                      <h3>
                        Hotel Name: <span>{item.hotelName}</span>
                      </h3>
                      <h3>
                        Room Number: <span>{item.roomNumber}</span>
                      </h3>
                      <h3>
                        City: <span>{item.city}</span>
                      </h3>
                      <h3>
                        Address: <span>{item.address}</span>
                      </h3>
                      <h3>
                        Price Per Night: <span>{item.pricePerNight}</span>
                      </h3>
                      <h3>
                        Availability Status:{" "}
                        <span>
                          {item.availabilty ? "Available" : "Unavailable"}
                        </span>
                      </h3>
                    </div>
                    <div id="room-rud">
                    <button style={{backgroundColor:"lightGreen"}}
                    onClick={() => handlePreviewClick(item)}
                    >Preview</button>
                    <button style={{backgroundColor:"#0F4157"}}
                     onClick={() => handleEditClick(item)}>Edit</button>
                    <button style={{backgroundColor:"orangeRed"}}
                     onClick={() => handleDeleteClick(item)}>Delete</button>
                  </div>
                  </div>
                  
                </div>
               
              ))}
          </>
        )}
        {showPreview && (
        <PreviewRoom
          room={selectedRoom}
          onClose={() => setShowPreview(false)}
        />
      )}
      {showEdit &&
        (<EditRoom  room={selectedRoom}
          onClose={() => setShowEdit(false)}/>)
      }
      {showDelete &&
        (<DeleteRoom  room={selectedRoom}
          onClose={() => setShowDelete(false)}/>)
      }
      </div>

  );
};

export default ListOfRooms;
