import React, { useEffect, useState } from "react";
import "./listofusers.css";
import axios from "axios";
const ListOfUsers = ({ users }) => {
  const [followedUser, setFollowedUser] = useState([]);
  const [followingUser, setFollowingUser] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [search, setSearch] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const followedUserCounts = users.map((user) => user.followers.length);
    const followingUserCounts = users.map((user) => user.following.length);
    setFollowedUser(followedUserCounts);
    setFollowingUser(followingUserCounts);
  }, [users]);
  
  const editUser = async (userId) => {
    try {
      await axios.put(`http://localhost:3001/api/user/${userId}`);
    } catch (err) {
      alert("Some connectivity error occurs.. try again later");
    }
  };
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/api/user/${userId}`);
    } catch (err) {
      alert("Some connectivity error occurs.. try again later");
    }
  };

  return (
    <div id="admin-list-of-user-container">
      <div id="admin-list-of-user-container-top">
        <h2>All Users Data</h2>
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
            <th>Followers</th>
            <th>Followings</th>
            <th>Gender</th>
            <th>City</th>
            <th>Country</th>
            <th>Verified User</th>
            <th>Accomodation Admin</th>
            <th>Transport Admin</th>
            <th>Local Guide Admin</th>
            <th>Shop Admin</th>
            <th>Blog Admin</th>
            <th></th>
            <th></th>
          </tr>
          {users ? (
            users
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.userName.toLowerCase().includes(search.toLowerCase());
              })
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
                  <td>{followedUser[i]}</td>
                  <td>{followingUser[i]}</td>
                  <td>{user.gender}</td>
                  <td>{user.city}</td>
                  <td>{user.country}</td>
                  <td>{user.isVerifiedUser ? "Yes" : "No"}</td>
                  <td>{user.isAccomodationAdmin ? "Yes" : "No"}</td>
                  <td>{user.isTransportAdmin ? "Yes" : "No"}</td>
                  <td>{user.isLocalGuideAdmin ? "Yes" : "No"}</td>
                  <td>{user.isShopAdmin ? "Yes" : "No"}</td>
                  <td>{user.isBlogAdmin ? "Yes" : "No"}</td>
                  <td
                    style={{ color: "skyBlue", cursor: "pointer" }}
                    onClick={editUser(user._id)}
                  >
                    <i class="fa-solid fa-pen"></i>
                  </td>
                  <td
                    style={{ color: "tomato", cursor: "pointer" }}
                    onClick={() => {
                      setOpenDelete(true);
                    }}
                  >
                    <i class="fa-solid fa-trash"></i>
                  </td>
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
                            <span style={{color:"#0F4157"}}>
                              Are you sure you want to delete this post?
                            </span>
                            <button
                              id="del-post-wrapper-sec-two-btn1"
                              onClick={deleteUser(user._id)}
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
                </tr>
              ))
          ) : (
            <div>No Data is found.. Try again later</div>
          )}
        </table>
      </div>
    </div>
  );
};

export default ListOfUsers;
