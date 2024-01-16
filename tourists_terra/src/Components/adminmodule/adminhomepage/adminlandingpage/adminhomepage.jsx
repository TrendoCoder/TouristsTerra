import React, { useEffect, useState } from "react";
import "./.adminhomepage.css";
import AdminTopBar from "../admintopbar/admintopbar";
import axios from "axios";
import ListOfUsers from "../listofusers/listOfUsers";
import DashBoard from "../dashboard/dashboard";
import ListOfHotels from "../listofhotels/listofhotels";
import GuidelinesAndPolicies from "../guidelinesandpolicies/guidelinesAndPolicies";
import ServiceProviders from "../serviceproviders/serviceProviders";
import ListOfReports from "../listofreports/listOfReports";
import ListOfBloggers from "../listofbloggers/listOfBloggers";
import ListOfLocalGuide from "../listoflocalguide/listOfLocalGuide";
import ListOfTransporter from "../listoftransporter/listOfTransporter";
import ListOfShopAdmin from "../listofshopadmin/listOfShopAdmin";
import CustomerSupport from "../customersupport/customersupport";
const AdminHomePage = () => {
  const [openUserOptions, setOpenUserOptions] = useState(false);
  const [openAccomodationOptions, setOpenAccomodationOptions] = useState(false);
  const [openTransportationOptions, setOpenTransportationOptions] =useState(false);
  const [openLocalGuideOptions, setOpenLocalGuideOptions] = useState(false);
  const [openShopOptions, setOpenShopOptions] = useState(false);
  const [openBlogOptions, setOpenBlogOptions] = useState(false);
  const [openServiceProviderOptions, setOpenServiceProviderOptions] = useState(false);
  const [openGuidelinesOptions, setOpenGuidelinesOptions] = useState(false);
  const [openReportOptions, setOpenReportOptions] = useState(false);
  const [openCustomerSupportOptions, setOpenCustomerSupportOptions] = useState(false);
  const [allUsers, setAllUsers] = useState(null);
  const [allHotels, setAllHotels] = useState(null);
  const [allServiceProviders, setAllServiceProviders] = useState(null);
  const [pendingServiceProviders, setPendingServiceProviders] = useState(null);
  const [suspendedServiceProviders, setSuspendedServiceProviders] = useState(null);
  const [disapprovedProviders, setDisapprovedServiceProviders] = useState(null);
  const [guideline, setGuidelines] = useState(null);
  const [allReports, setAllReports] = useState(null);
  const [customerSupport, setCustomerSupport] = useState(null);
  const [clickNumber, setClickNumber] = useState(0);

  useEffect(() => {
    const getUsers = async () => {
      const users = await axios.get("http://localhost:3001/api/user/all");
      setAllUsers(users.data);
    };
    getUsers();
  }, []);
  useEffect(() => {
    const getHotels = async () => {
      const hotels = await axios.get("http://localhost:3001/api/hotels/");
      setAllHotels(hotels.data);
    };
    getHotels();
  }, []);
  useEffect(() => {
    const getServiceProviders = async () => {
      const serviceProviders = await axios.get(
        "http://localhost:3001/api/serviceProvider/all?status=Approved"
      );
      setAllServiceProviders(serviceProviders.data);

      const pendingServiceProviders = await axios.get(
        "http://localhost:3001/api/serviceProvider/all?status=Pending"
      );
      setPendingServiceProviders(pendingServiceProviders.data);

      const disapprovedServiceProviders = await axios.get(
        "http://localhost:3001/api/serviceProvider/all?status=Disapproved"
      );
      setDisapprovedServiceProviders(disapprovedServiceProviders.data);

      const suspendServiceProviders = await axios.get(
        "http://localhost:3001/api/serviceProvider/all?status=Suspend"
      );
      setSuspendedServiceProviders(suspendServiceProviders.data);
    };
    getServiceProviders();
  }, []);

  useEffect(() => {
    const getGuidelinesAndPolicies = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/admin/guidelines-and-policies/"
        );
        setGuidelines(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getGuidelinesAndPolicies();
  }, []);
  useEffect(()=>{
    const getReports = async()=>{
      try{
        const res = await axios.get(
          "http://localhost:3001/api/report/"
        );
        setAllReports(res.data);
      }catch(err){
        console.log(err);
      }
    };
    getReports();
  },[]);
  useEffect(() => {
    const getQueries = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/contactus/");
        setCustomerSupport(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getQueries();
  }, []);
  
  return (
    <div id="admin-hp-big-container">
      <AdminTopBar />
      <div id="admin-hp-main-container">
        <div id="admin-hp-left-bar">
          <div id="admin-left-bar-main-container">
            <div
              className="admin-left-bar-main-options-div"
              style={{ backgroundColor: "#0F4157" }}
            >
              <h3 onClick={() => setClickNumber(0)}>Dashboard</h3>
            </div>
            <div className="admin-left-bar-main-options-div">
              <h3
                onClick={() => setOpenUserOptions(!openUserOptions)}
                style={openUserOptions ? { backgroundColor: "#0F4157" } : {}}
              >
                Users
              </h3>
              {openUserOptions ? (
                <div style={{ marginLeft: "20px" }}>
                  <div onClick={() => setClickNumber(1)}>List of Users</div>
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="admin-left-bar-main-options-div">
              <h3
                onClick={() =>
                  setOpenAccomodationOptions(!openAccomodationOptions)
                }
                style={
                  openAccomodationOptions ? { backgroundColor: "#0F4157" } : {}
                }
              >
                Accomodations
              </h3>
              {openAccomodationOptions ? (
                <div style={{ marginLeft: "20px" }}>
                  <div onClick={() => setClickNumber(2)}>List of Hotels</div>
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="admin-left-bar-main-options-div">
              <h3
                onClick={() =>
                  setOpenTransportationOptions(!openTransportationOptions)
                }
                style={
                  openTransportationOptions
                    ? { backgroundColor: "#0F4157" }
                    : {}
                }
              >
                Transportation
              </h3>
              {openTransportationOptions ? (
                <div style={{ marginLeft: "20px" }}>
                  <div onClick={() => setClickNumber(3)}>List of Drivers</div>
                  
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="admin-left-bar-main-options-div">
              <h3
                onClick={() => setOpenLocalGuideOptions(!openLocalGuideOptions)}
                style={
                  openLocalGuideOptions ? { backgroundColor: "#0F4157" } : {}
                }
              >
                Local Guide
              </h3>
              {openLocalGuideOptions ? (
                <div style={{ marginLeft: "20px" }}>
                  <div onClick={() => setClickNumber(4)}>List of Local Guides</div>
                  
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="admin-left-bar-main-options-div">
              <h3
                onClick={() => setOpenShopOptions(!openShopOptions)}
                style={openShopOptions ? { backgroundColor: "#0F4157" } : {}}
              >
                Shop
              </h3>
              {openShopOptions ? (
                <div style={{ marginLeft: "20px" }}>
                  <div onClick={() => setClickNumber(5)}>List of Shops</div>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="admin-left-bar-main-options-div">
              <h3
                onClick={() => setOpenBlogOptions(!openBlogOptions)}
                style={openBlogOptions ? { backgroundColor: "#0F4157" } : {}}
              >
                Blogger
              </h3>
              {openBlogOptions ? (
                <div style={{ marginLeft: "20px" }}>
                  <div onClick={() => setClickNumber(6)}>List of Bloggers</div>
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="admin-left-bar-main-options-div">
              <h3
                onClick={() => setOpenServiceProviderOptions(!openServiceProviderOptions)}
                style={
                  openServiceProviderOptions ? { backgroundColor: "#0F4157" } : {}
                }
              >
                Service Providers
              </h3>
              {openServiceProviderOptions ? (
                <div style={{ marginLeft: "20px" }}>
                  <div onClick={() => setClickNumber(7)}>
                    List of SP
                  </div>
                  <div onClick={() => setClickNumber(8)}>Pending Requests</div>
                  <div onClick={() => setClickNumber(9)}>Disapproved</div>
                  <div onClick={() => setClickNumber(10)}>Suspended</div>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="admin-left-bar-main-options-div">
              <h3
                onClick={() => setOpenGuidelinesOptions(!openGuidelinesOptions)}
                style={
                  openGuidelinesOptions ? { backgroundColor: "#0F4157" } : {}
                }
              >
                Guidelines & Policies
              </h3>
              {openGuidelinesOptions ? (
                <div style={{ marginLeft: "20px" }}>
                  <div onClick={() => setClickNumber(11)}>Preview</div>
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="admin-left-bar-main-options-div">
              <h3
                onClick={() => setOpenReportOptions(!openReportOptions)}
                style={openReportOptions ? { backgroundColor: "#0F4157" } : {}}
              >
                Reports
              </h3>
              {openReportOptions ? (
                <div style={{ marginLeft: "20px" }}>
                  <div onClick={() => setClickNumber(12)}>List Of reports</div>
                </div>
              ) : (
                <></>
              )} 
           <div className="admin-left-bar-main-options-div">
              <h3
                onClick={() => setOpenCustomerSupportOptions(!openCustomerSupportOptions)}
                style={
                  openCustomerSupportOptions ? { backgroundColor: "#0F4157" } : {}
                }
              >
                Customer Support
              </h3>
              {openCustomerSupportOptions ? (
                <div style={{ marginLeft: "20px" }}>
                  <div onClick={() => setClickNumber(13)}>List of Queries</div>
                </div>
              ) : (
                <></>
              )}
            </div>
            
            </div>
          </div>
        </div>
        <div id="admin-hp-right-bar">
          {clickNumber === 0 ? (
            <div id="admin-hp-right-bar-divs">
              <DashBoard />
            </div>
          ) : clickNumber === 1 ? (
            <div id="admin-hp-right-bar-divs">
              <ListOfUsers users={allUsers} />
            </div>
          ) : clickNumber === 2 ? (
            <div id="admin-hp-right-bar-divs">
              <ListOfHotels hotels={allHotels} />
            </div>
          ) : clickNumber === 3 ? (
            <div id="admin-hp-right-bar-divs">
              <ListOfTransporter />
            </div>
          ) : clickNumber === 4 ? (
            <div id="admin-hp-right-bar-divs">
              <ListOfLocalGuide />
            </div>
            
          ) : clickNumber === 5 ? (
            <div id="admin-hp-right-bar-divs">
              <ListOfShopAdmin />
            </div>
          ) : clickNumber === 6 ? (
            <div id="admin-hp-right-bar-divs">
              <ListOfBloggers />
            </div>
          ) : clickNumber === 7 ? (
            <div id="admin-hp-right-bar-divs">
              <ServiceProviders serviceProvider={allServiceProviders} />
            </div>
           
          ) : clickNumber === 8 ? (
            <div id="admin-hp-right-bar-divs">
              <ServiceProviders serviceProvider={pendingServiceProviders} />
            </div>
          ): clickNumber === 9 ? (
            <div id="admin-hp-right-bar-divs">
              <ServiceProviders serviceProvider={disapprovedProviders} />
            </div>
          ) : clickNumber === 10 ? (
            <div id="admin-hp-right-bar-divs">
              <ServiceProviders serviceProvider={suspendedServiceProviders} />
            </div>
          ) : clickNumber === 11 ? (
            <div id="admin-hp-right-bar-divs">
              <GuidelinesAndPolicies guidelines={guideline} />
            </div>
          ) : clickNumber === 12 ? (
            <div id="admin-hp-right-bar-divs">
              <ListOfReports reports={allReports} />
            </div>
          ) : clickNumber === 13 ? (
            <CustomerSupport/>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
