import React, { useState } from 'react'
import "./adminleftbar.css"
const AdminLeftBar = () => {
    const [openUserOptions, setOpenUserOptions] = useState(false);
  return (
    <div id='admin-left-bar-main-container'>
    <div id='admin-left-bar-main-options'>
        Dashboard 
    </div>
    <div >
        <h3 onClick={()=> setOpenUserOptions(!openUserOptions)}>Users</h3> 
       {openUserOptions?<div>
            <div>
                List of Users
            </div>
            <div>
                Add New User
            </div>
            <div>
                Update User
            </div>
            <div>
                Remove User
            </div>
        </div>:
        <></>}
    </div>
    </div>
  )
}

export default AdminLeftBar