import React, { useEffect, useState } from 'react';
import './listofusers.css';

const ListOfUsers = ({ users }) => {
  const [followedUser, setFollowedUser] = useState([]);
  const [followingUser, setFollowingUser] = useState([]);
  const [search,setSearch] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const followedUserCounts = users.map((user) => user.followers.length);
    const followingUserCounts = users.map((user) => user.following.length);
    setFollowedUser(followedUserCounts);
    setFollowingUser(followingUserCounts);
  }, [users]);

  return (
    <div id='admin-list-of-user-container'>
      <div id='admin-list-of-user-container-top'>
      <h2>All Users Data</h2>
        <input type='text' placeholder='search' value={search} onChange={(e)=>setSearch(e.target.value)}/>
      </div>
      <div id='admin-list-of-user-container-list'>
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
          </tr>
          {
            users ? users.filter((item) => {
        return search.toLowerCase() === '' ? item : item.userName.toLowerCase().includes(search.toLowerCase());
      }).map((user, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                <img
                  src={
                    user.userProfilePicture
                      ? PF + `/profilePicture/${user.userProfilePicture}`
                      : PF + '/profileUpload.png'
                  }
                  alt={PF + '/profileUpload.png'}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    margin: 'auto',
                  }}
                  crossOrigin='anonymous'
                />
              </td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{followedUser[i]}</td>
              <td>{followingUser[i]}</td>
              <td>{user.gender}</td>
              <td>{user.city}</td>
              <td>{user.country}</td>
              <td>{user.isVerifiedUser ? 'Yes' : 'No'}</td>
              <td>{user.isAccomodationAdmin ? 'Yes' : 'No'}</td>
              <td>{user.isTransportAdmin ? 'Yes' : 'No'}</td>
              <td>{user.isLocalGuideAdmin ? 'Yes' : 'No'}</td>
              <td>{user.isShopAdmin ? 'Yes' : 'No'}</td>
              <td>{user.isBlogAdmin ? 'Yes' : 'No'}</td>
            </tr>
          )):(<div>No Data is found.. Try again later</div>)}
        </table>
      </div>
    </div>
  );
};

export default ListOfUsers;
