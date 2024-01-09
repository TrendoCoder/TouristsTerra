import React, { useEffect, useState } from "react";
import "./listofusers.css";
import axios from "axios";
const ListOfUsers = () => {
  const [followedUser, setFollowedUser] = useState([]);
  const [followingUser, setFollowingUser] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isVerifiedUser, setIsVerifiedUser] = useState({});
  const [isAccomodationAdmin, setIsAccomodationAdmin] = useState({});
  const [isTransportAdmin, setIsTransportAdmin] = useState({});
  const [isLocalGuideAdmin, setIsLocalGuideAdmin] = useState({});
  const [isShopAdmin, setIsShopAdmin] = useState({});
  const [isBlogAdmin, setIsBlogAdmin] = useState({});
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setLoading(true);
    getUsers();
  }, []);
  
  useEffect(() => {
    counting();
    setLoading(false);
  }, [users]);
  
  const getUsers = async () => {
    const users = await axios.get("http://localhost:3001/api/user/all");
    setUsers(users.data);
  };
  const counting = () => {
    const followedUserCounts = users.map((user) => user.followers.length);
    const followingUserCounts = users.map((user) => user.following.length);
    setFollowedUser(followedUserCounts);
    setFollowingUser(followingUserCounts);
  };
  const editUser = async (userId) => {
    try {
      await axios.put(`http://localhost:3001/api/user/${userId}`, {
        isVerifiedUser: isVerifiedUser[userId],
        isAccomodationAdmin: isAccomodationAdmin[userId],
        isTransportAdmin:isTransportAdmin[userId],
        isShopAdmin : isShopAdmin[userId],
        isLocalGuideAdmin: isLocalGuideAdmin[userId],
        isBlogAdmin:isBlogAdmin[userId],
      });
      alert("Successfully Edited..");
      setOpenEdit(false);
      getUsers();
    } catch (err) {
      alert("Some connectivity error occurs.. try again later");
    }
  };
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/api/user/delete/${userId}`);
      alert("Successfully Deleted..");
      setOpenDelete(false);
      getUsers();
    } catch (err) {
      alert("Some connectivity error occurs.. try again later");
      setOpenDelete(false);
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
            <th></th>
          </tr>
          {!loading ? (
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
                  <td>
                    <select
                      value={
                        isVerifiedUser[user._id] ||
                        (user.isVerifiedUser ? "true" : "false")
                      }
                      onChange={(e) =>
                        setIsVerifiedUser({
                          ...isVerifiedUser,
                          [user._id]: e.target.value,
                        })
                      }
                      disabled={!openEdit}
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </td>
                  <td>
                    {" "}
                    <select
                      value={
                        isAccomodationAdmin[user._id] ||
                        (user.isAccomodationAdmin ? "true" : "false")
                      }
                      onChange={(e) =>
                        setIsAccomodationAdmin({
                          ...isAccomodationAdmin,
                          [user._id]: e.target.value,
                        })
                      }
                      disabled={!openEdit}
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={
                        isTransportAdmin[user._id] ||
                        (user.isTransportAdmin ? "true" : "false")
                      }
                      onChange={(e) =>
                        setIsTransportAdmin({
                          ...isTransportAdmin,
                          [user._id]: e.target.value,
                        })
                      }
                      disabled={!openEdit}
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={
                        isLocalGuideAdmin[user._id] ||
                        (user.isLocalGuideAdmin ? "true" : "false")
                      }
                      onChange={(e) =>
                        setIsLocalGuideAdmin({
                          ...isLocalGuideAdmin,
                          [user._id]: e.target.value,
                        })
                      }
                      disabled={!openEdit}
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={
                        isShopAdmin[user._id] ||
                        (user.isShopAdmin ? "true" : "false")
                      }
                      onChange={(e) =>
                        setIsShopAdmin({
                          ...isShopAdmin,
                          [user._id]: e.target.value,
                        })
                      }
                      disabled={!openEdit}
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={
                        isBlogAdmin[user._id] ||
                        (user.isBlogAdmin ? "true" : "false")
                      }
                      onChange={(e) =>
                        setIsBlogAdmin({
                          ...isBlogAdmin,
                          [user._id]: e.target.value,
                        })
                      }
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
                      editUser(user._id);
                    }}
                    disabled={!openEdit}
                  >
                    Edit
                  </td>
                  <td
                    style={{ color: "tomato", cursor: "pointer" }}
                    onClick={() => {
                      setUser(user);
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
                    Are you sure you want to delete this User (
                    {`${user.userName}`})?
                  </span>
                  <button
                    id="del-post-wrapper-sec-two-btn1"
                    onClick={() => {
                      deleteUser(user._id);
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
  );
};

export default ListOfUsers;
