import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Check if the user is logged in
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is logged in
        setUser(authUser);

        // Fetch user's files from a database (e.g., Firestore)
        // Update the "files" state with the user's files
        // Example: fetchUserFiles(authUser.uid).then((data) => setFiles(data));
      } else {
        // User is not logged in, redirect to the login page
        setUser(null);
        // Example: history.push('/login');
      }
    });

    return () => {
      // Unsubscribe the observer when the component unmounts
      unsubscribe();
    };
  }, []);

  // Handle file upload logic
  const handleFileUpload = (event) => {
    // Implement your file upload logic here
    // You can use a library like Firebase Storage for file uploads
  };

  return (
    <div>
      <h2>Welcome, {user ? user.email : 'Guest'}</h2>
      <h3>Your Files</h3>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            {file.name} - Access Control: {file.accessControl}
          </li>
        ))}
      </ul>
      <div>
        <h3>Upload New File</h3>
        <input type="file" onChange={handleFileUpload} />
      </div>
      <div>
        <Link to="/access-control">Manage Access Control</Link>
      </div>
      <div>
        <button onClick={() => firebase.auth().signOut()}>Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;