import React, { useState, useEffect } from "react";
import axios from "axios";
const ListOfLocalGuide = () => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [isLocalGuideAdmin, setisLocalGuideAdmin] = useState({});
    const [search, setSearch] = useState("");
    const [localGuide, setlocalGuide]= useState({});
    const [localGuides, setlocalGuides]= useState([]);
    const [loading,setLoading]= useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        setLoading(true);
        getUsers();
        setLoading(false);

    }, [])
    const editlocalGuide = async(userId)=>{
        try {
            await axios.put(`http://localhost:3001/api/user/${userId}`, {
              isLocalGuideAdmin: isLocalGuideAdmin[userId],
            });
            alert("Successfully Edited..");
            setOpenEdit(false);
            getUsers();
          } catch (err) {
            alert("Some connectivity error occurs.. try again later");
            setOpenEdit(false);
          }
    }
    const getUsers = async () => {
        const users = await axios.get("http://localhost:3001/api/user/all");
        setlocalGuides(users.data);
      };
    const deletelocalGuide = async(userId)=>{
        try{
            await axios.delete(`http://localhost:3001/api/user/delete/${userId}`);
            alert("Successfully Deleted..");
            setOpenDelete(false);
            getUsers();
        }catch(err){
            alert("Some connectivity error occurs.. try again later");
            setOpenDelete(false);

        }
    }
  return (
    <div id="admin-list-of-user-container">
    <div id="admin-list-of-user-container-top">
      <h2>All LocalGuides Data</h2>
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
          <th>Pic.</th>
          <th>User Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>City</th>
          <th>Country</th>
          <th>Local-Guide Admin</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        {!loading ? (
          localGuides
          .filter(
                  (item) =>
                    (search.toLowerCase() === "" ||
                      item.userName
                        .toLowerCase()
                        .includes(search.toLowerCase())) &&
                    item.isLocalGuideAdmin &&
                    item.isLocalGuideAdmin.toString() === "true"
                )
            .map((user, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <img
                    src={
                      user.userProfilePicture
                        ? PF + `/profilePicture/${user.userProfilePicture}`
                        : PF + "/profileUpload.png"
                    }
                    alt={PF + "/profileUpload.png"}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      margin: "auto",
                    }}
                    crossOrigin="anonymous"
                  />
                </td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.city}</td>
                <td>{user.country}</td>
                <td>
                <select
                                value={isLocalGuideAdmin[user._id] || (user.isLocalGuideAdmin ? "true" : "false")}
                                onChange={(e) => setisLocalGuideAdmin({ ...isLocalGuideAdmin, [user._id]: e.target.value })}
                                disabled={!openEdit}
                            >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                </td>
                <td
                  style={{ color: "skyBlue", cursor: "pointer" }}
                  onClick={() => {
                    setOpenEdit(true);
                  }}
                >
                  <i class="fa-solid fa-pen"></i>
                </td>
                <td
                  onClick={() => {
                     editlocalGuide(user._id);
                  }}
                  disabled={!openEdit}
                >
                  Edit
                </td>
                <td
                  style={{ color: "tomato", cursor: "pointer" }}
                  onClick={() => {
                    setlocalGuide(user);
                    setOpenDelete(true);
                    
                  }}
                >
                  <i class="fa-solid fa-trash"></i>
                </td>
              </tr>
            ))
        ) : (
          <div>No Data is found.. Try again later</div>
        )}
      </table>
       {openDelete && (
                    <div id="Open-report">
                      <div id="rep-post-container">
                        <div id="del-post-wrapper">
                          <div id="del-post-wrapper-sec-one">
                            <i
                              class="fa-solid fa-circle-xmark fa-beat"
                              style={{ color: "#ff1900" }}
                              onClick={() => {
                                setOpenDelete(false);
                              }}
                            ></i>
                          </div>
                          <div id="del-post-wrapper-sec-two">
                            <span style={{ color: "#0F4157" }}>
                              Are you sure you want to delete this localGuide ({`${localGuide.userName}`})?
                            </span>
                            <button
                              id="del-post-wrapper-sec-two-btn1"
                              onClick={() => {
                                 deletelocalGuide(localGuide._id);
                              }}
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => {
                                setOpenDelete(false);
                              }}
                              id="del-post-wrapper-sec-two-btn2"
                            >
                              No
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
    </div>
  </div>
  )
}

export default ListOfLocalGuide