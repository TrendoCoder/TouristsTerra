import React, { useEffect, useState } from 'react';
import './listofreports.css';
import axios from 'axios';
const ListOfReports = () => {

  const [search,setSearch] = useState("");
  const [loading,setLoading] = useState(true);
  const [reports, setReports]= useState(null);

  useEffect(()=>{
    setLoading(false);
    getReports();
  },[]);
  const getReports = async()=>{
    try{
      const res = await axios.get(
        "http://localhost:3001/api/report/"
      );
      setReports(res.data);
      setLoading(true);
    }catch(err){
      console.log(err);
    }
  };
  return (
    <div id='admin-list-of-user-container'>
      <div id='admin-list-of-user-container-top'>
      <h2>All Reports</h2>
        <input type='text' placeholder='search' value={search} onChange={(e)=>setSearch(e.target.value)}/>
      </div>
    {loading?<div id='admin-list-of-user-container-list'>
        <table>
          <tr>
            <th>#</th>
            <th>Reporter Id</th>
            <th>Reported Id</th>
            <th>Type</th>
            <th>Message</th>
          </tr>
          {
            reports ? reports.filter((item) => {
        return search.toLowerCase() === '' ? item : item.type.toLowerCase().includes(search.toLowerCase());
      }).map((report, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{report.reporterId}</td>
              <td>{report.authorId}</td>
              <td>{report.type}</td>
              <td>{report.message}</td>
            </tr>
          )):(<div>No Data is found.. Try again later</div>)}
        </table>
      </div>:""}
    </div>
  );
};

export default ListOfReports;
