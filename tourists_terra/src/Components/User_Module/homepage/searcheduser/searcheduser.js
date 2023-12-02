import React from 'react'

const SearchedUser = ({item}) => {
  return (
    <div id='searchedUser-container'>
    <div id='searchedUser-wrapper'>
        <span>{item.userName}</span>
        <p>Shamir</p>
    </div>
    </div>
  )
}

export default SearchedUser