import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./.adminhomepage.css";
import AdminTopBar from "../admintopbar/admintopbar";
import axios from "axios"
import ListOfUsers from "../listofusers/listOfUsers";
import DashBoard from "../dashboard/dashboard";
import ListOfHotels from "../listofhotels/listofhotels";
import GuidelinesAndPolicies from "../guidelinesandpolicies/guidelinesAndPolicies";
const AdminHomePage = () => {

  const [openUserOptions, setOpenUserOptions] = useState(false);
  const [openAccomodationOptions, setOpenAccomodationOptions] = useState(false);
  const [openTransportationOptions, setOpenTransportationOptions] = useState(false);
  const [openLocalGuideOptions, setOpenLocalGuideOptions] = useState(false);
  const [openShopOptions, setOpenShopOptions] = useState(false);
  const [openBlogOptions, setOpenBlogOptions] = useState(false);
  const [openGuidelinesOptions, setOpenGuidelinesOptions] = useState(false);
  const [openReportOptions, setOpenReportOptions] = useState(false);
  const [allUsers, setAllUsers] = useState(null);
  const [allHotels, setAllHotels] = useState(null);
  const [clickNumber, setClickNumber] = useState(0);
  useEffect(()=>{
    const getUsers =async()=>{
      const users = await axios.get('http://localhost:3001/api/user/all');
      setAllUsers(users.data);
    }
    getUsers();
  },[]);
  useEffect(()=>{
    const getHotels = async()=>{
      const hotels =  await axios.get("http://localhost:3001/api/hotels/");
      setAllHotels(hotels.data);
    } 
    getHotels();
  },[])
console.log(allUsers);
console.log(allHotels);
  return (
    <div id="admin-hp-big-container">

    <AdminTopBar/>
      <div id="admin-hp-main-container">
        <div id="admin-hp-left-bar">
          <div id="admin-left-bar-main-container">
          <div className="admin-left-bar-main-options-div" style={{backgroundColor:"#0F4157"}}>
              <h3 onClick={()=>setClickNumber(0)}>
                Dashboard
              </h3>
            </div>
            <div className="admin-left-bar-main-options-div" >
              <h3 onClick={() => setOpenUserOptions(!openUserOptions)} style={openUserOptions?{backgroundColor:"#0F4157"}:{}}>
                Users
              </h3>
              {openUserOptions ? (
                <div style={{marginLeft:"20px"}}>
                  <div onClick={()=>setClickNumber(1)}>List of Users</div>
                  <div>Add New User</div>
                  <div>Update User</div>
                  <div>Remove User</div>
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="admin-left-bar-main-options-div">
              <h3 onClick={() => setOpenAccomodationOptions(!openAccomodationOptions)} style={openAccomodationOptions?{backgroundColor:"#0F4157"}:{}}>
                Accomodations
              </h3>
              {openAccomodationOptions ? (
                <div style={{marginLeft:"20px"}}>
                  <div onClick={()=>setClickNumber(2)}>List of Hotels</div>
                  <div>Add New Hotel</div>
                  <div>Update Hotel</div>
                  <div>Remove Hotel</div>
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="admin-left-bar-main-options-div">
              <h3 onClick={() => setOpenTransportationOptions(!openTransportationOptions)} style={openTransportationOptions?{backgroundColor:"#0F4157"}:{}}>
                Transportation
              </h3>
              {openTransportationOptions ? (
                <div style={{marginLeft:"20px"}}>
                  <div onClick={()=>setClickNumber(1)}>List of Drivers</div>
                  <div>Add New Driver</div>
                  <div>Update Driver</div>
                  <div>Remove Driver</div>
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="admin-left-bar-main-options-div">
              <h3 onClick={() => setOpenLocalGuideOptions(!openLocalGuideOptions)} style={openLocalGuideOptions?{backgroundColor:"#0F4157"}:{}}>
                Local Guide
              </h3>
              {openLocalGuideOptions ? (
                <div style={{marginLeft:"20px"}}>
                  <div onClick={()=>setClickNumber(2)}>List of Hotels</div>
                  <div>Add New Hotel</div>
                  <div>Update Hotel</div>
                  <div>Remove Hotel</div>
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="admin-left-bar-main-options-div">
              <h3 onClick={() => setOpenShopOptions(!openShopOptions)} style={openShopOptions?{backgroundColor:"#0F4157"}:{}}>
                Shop
              </h3>
              {openShopOptions ? (
                <div style={{marginLeft:"20px"}}>
                  <div onClick={()=>setClickNumber(2)}>List of Hotels</div>
                  <div>Add New Hotel</div>
                  <div>Update Hotel</div>
                  <div>Remove Hotel</div>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="admin-left-bar-main-options-div">
              <h3 onClick={() => setOpenBlogOptions(!openBlogOptions)} style={openBlogOptions?{backgroundColor:"#0F4157"}:{}}>
                Blogger
              </h3>
              {openBlogOptions ? (
                <div style={{marginLeft:"20px"}}>
                  <div onClick={()=>setClickNumber(1)}>List of Bloggers</div>
                  <div>Add New Blogger</div>
                  <div>Update Blogger</div>
                  <div>Remove Blogger</div>
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="admin-left-bar-main-options-div">
              <h3 onClick={() => setOpenGuidelinesOptions(!openGuidelinesOptions)} style={openGuidelinesOptions?{backgroundColor:"#0F4157"}:{}}>
                Guidelines & Policies
              </h3>
              {openGuidelinesOptions ? (
                <div style={{marginLeft:"20px"}}>
                  <div onClick={()=>setClickNumber(4)}>Preview</div>
                  <div>Edit</div>
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="admin-left-bar-main-options-div">
              <h3 onClick={() => setOpenReportOptions(!openReportOptions)} style={openReportOptions?{backgroundColor:"#0F4157"}:{}}>
               Reports
              </h3>
              {openReportOptions ? (
                <div style={{marginLeft:"20px"}}>
                  <div onClick={()=>setClickNumber(6)}>List Of reports</div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div id="admin-hp-right-bar">
        {
          clickNumber===0?
          <div id="admin-hp-right-bar-divs" >
            <DashBoard/>
          </div>
          :clickNumber===1?(
            <div id="admin-hp-right-bar-divs">
              <ListOfUsers users={allUsers}/>
            </div>
          ):clickNumber===2?(
            <div id="admin-hp-right-bar-divs">
              <ListOfHotels hotels={allHotels}/>
            </div>
          ):clickNumber===3?(
            <div id="admin-hp-right-bar-divs">
              <ListOfUsers users={allUsers}/>
            </div>
          ):clickNumber===4?(
            <div id="admin-hp-right-bar-divs">
              <GuidelinesAndPolicies/>
            </div>
          ):clickNumber===5?(
            <div id="admin-hp-right-bar-divs">
              <ListOfUsers users={allUsers}/>
            </div>
          ):
          (<div>

          </div>)}
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
