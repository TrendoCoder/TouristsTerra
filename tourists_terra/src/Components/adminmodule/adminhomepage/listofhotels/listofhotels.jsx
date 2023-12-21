import React, { useEffect, useState } from 'react';import "./listofhotels.css"
const ListOfHotels = ({hotels}) => {
      const [roomNumberLength, setRoomNumberLength] = useState([]);
      const [search,setSearch] = useState("");
      const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    
      useEffect(() => {
        const roomCounts = hotels.map((hotel) => hotel.rooms.length);
        setRoomNumberLength(roomCounts);
      }, [hotels]);
    
      return (
        <div id='admin-list-of-user-container'>
          <div id='admin-list-of-user-container-top'>
          <h2>All Users Data</h2>
            <input type='text' placeholder='search' onChange={(e)=>setSearch(e.target.value)} />
          </div>
          <div id='admin-list-of-user-container-list'>
            <table>
              <tr>
                <th>#</th>
                <th>Pic.</th>
                <th>Name</th>
                <th>Title</th>
                <th>User Id</th>
                <th>City</th>
                <th>Total Rooms</th>
                <th>Featured</th>
              </tr>
              {hotels ? hotels.filter((item)=>{
                return search.toLowerCase()===''? item : item.name.toLowerCase().includes(search.toLowerCase())
              }).map((hotel, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <img
                      src={
                        hotel.photos
                          ? PF + `/hotelimgs/${hotel.photos}`
                          : PF + '/profileUpload.png'
                      }
                      alt={PF + '/profileUpload.png'}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '5px',
                        margin: 'auto',
                      }}
                      crossOrigin='anonymous'
                    />
                  </td>
                  <td>{hotel.name}</td>
                  <td>{hotel.title}</td>
                  <td>{hotel.userId}</td>
                  <td>{hotel.city}</td>
                  <td>{roomNumberLength[i]}</td>
                  <td>{hotel.featured ? 'Yes' : 'No'}</td>
                </tr>
              )):(<div>No Data is found.. Try again later</div>)}
            </table>
          </div>
        </div>
      );
    };

export default ListOfHotels