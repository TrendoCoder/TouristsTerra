import React from 'react';
import { Link } from 'react-router-dom';
import './.adminhomepage.css'
import AdminLeftBar from '../adminleftbar/adminleftbar';

const AdminHomePage = () => {
  return(
    <>
    <div id='admin-hp-main-container'>
    <div id='admin-hp-left-bar'>
    <AdminLeftBar/>
    </div>
    <div id='admin-hp-right-bar'>

    </div>
    </div>
    </>
  );
};

export default AdminHomePage;
