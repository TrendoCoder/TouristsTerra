import React from 'react'
import "./searcheduser.css"
const SearchedUser = ({item}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div id='searchedUser-container'>
    <a href={`/profile-page/${item.userName}`}>
    <div id='searchedUser-wrapper'>
    <img src={item.userProfilePicture?PF+`/profilePicture/${item.userProfilePicture}`: PF+"/profileUpload.png"} alt="" crossOrigin='anonymous' />
        <span>{item.userName}</span>
    </div>
    </a>
    </div>
  )
}

export default SearchedUser