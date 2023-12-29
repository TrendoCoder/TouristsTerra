import React from 'react'
import "./admintopbar.css"
import pic from "../../../../images/profile.jpeg"
const AdminTopBar = () => {
  return (
    <div id='admin-panel-top-bar-main-container'>
    <div id='admin-panel-top-bar-left-div'>
    <h2>TOURISTs TERRA</h2>
    </div>
    <div  id='admin-panel-top-bar-right-div'>
    <i class="fa-regular fa-bell" style={{color: "#ffffff"}}></i>
    <img src={pic} alt="" />
    </div>
    </div>
  )
}

export default AdminTopBar