import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Import the associated CSS file

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <p>Welcome to your secure file storage dashboard!</p>
      <div className="dashboard-options">
        <Link to="/file-upload" className="dashboard-link">
          Upload Files
        </Link>
        <Link to="/file-list" className="dashboard-link">
          View Files
        </Link>
        <Link to="/access-control" className="dashboard-link">
          Access Control
        </Link>
        <Link to="/cmk-manager" className="dashboard-link">
          CMK Manager
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;

/* Dashboard.css (components/Dashboard.css) */

// .dashboard-container {
//     max-width: 800px;
//     margin: 0 auto;
//     padding: 20px;
//     border: 1px solid #ccc;
//     border-radius: 4px;
//     background-color: #fff;
//     text-align: center;
//   }
  
//   .dashboard-container h2 {
//     text-align: center;
//   }
  
//   .dashboard-options {
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: center;
//     margin-top: 20px;
//   }
  
//   .dashboard-link {
//     display: block;
//     padding: 10px 20px;
//     margin: 10px;
//     background-color: #007bff;
//     color: #fff;
//     text-decoration: none;
//     border-radius: 4px;
//     transition: background-color 0.3s ease;
//   }
  
//   .dashboard-link:hover {
//     background-color: #0056b3;
//   }