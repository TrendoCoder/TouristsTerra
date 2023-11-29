import React from 'react'

const SearchedUser = ({item}) => {
  return (
    <div id='searchedUser-container'>
    <div id='searchedUser-wrapper'>
        <span>{item.userName}</span>
    </div>
    </div>
  )
}

export default SearchedUser