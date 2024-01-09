import React, { useEffect, useState } from 'react';
import './listofreports.css';

const ListOfReports = ({ reports }) => {
  const [search,setSearch] = useState("");

  return (
    <div id='admin-list-of-user-container'>
      <div id='admin-list-of-user-container-top'>
      <h2>All Reports</h2>
        <input type='text' placeholder='search' value={search} onChange={(e)=>setSearch(e.target.value)}/>
      </div>
      <div id='admin-list-of-user-container-list'>
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
      </div>
    </div>
  );
};

export default ListOfReports;
