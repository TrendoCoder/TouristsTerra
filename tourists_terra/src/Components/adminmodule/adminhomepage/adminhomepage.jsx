import React from 'react';
import { Link } from 'react-router-dom';

const AdminHomePage = ({ children }) => {
  const handleReportClick = () => {
    // Implement logic to handle user reports
    // For example, show a modal or navigate to a dedicated page
    console.log("Handle User Reports");
  };

  const handleDeleteClick = () => {
    // Implement logic to delete a blog post or post
    console.log("Handle Delete Action");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        {/* Add links to various sections */}
        <Link to="/admin/users">User Management</Link>
        <button onClick={handleReportClick}>User Reports</button>
        {/* Add more links for other sections */}
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-4">
        {/* Render the current page/component */}
        {children}

        {/* Example of handling user reports */}
        <div>
          <h2 className="text-xl font-bold mb-4">User Reports</h2>
          {/* Fetch and display user reports */}
          {/* For each reported item, display details and actions */}
          <div>
            <p>User John Doe reported a blog post:</p>
            <p>Reason: Inappropriate content</p>
            <button onClick={handleDeleteClick}>Delete Blog Post</button>
          </div>
          {/* Add more reported items */}
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
