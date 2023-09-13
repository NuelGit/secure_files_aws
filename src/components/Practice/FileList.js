import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

function FileList() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Fetch user's files from Firestore
    // Replace 'userId' with the actual user ID or authentication data
    const userId = firebase.auth().currentUser?.uid;
    if (userId) {
      const filesRef = firebase.firestore().collection('files');
      filesRef
        .where('userId', '==', userId)
        .get()
        .then((querySnapshot) => {
          const fileList = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            fileList.push({ id: doc.id, ...data });
          });
          setFiles(fileList);
        })
        .catch((error) => {
          console.error('Error fetching files:', error.message);
        });
    }
  }, []);

  const handleDownload = (file) => {
    // Implement file download logic here
    // You can open the file's URL in a new tab or use any other download method
    window.open(file.url, '_blank');
  };

  const handleDelete = (file) => {
    // Implement file deletion logic here
    // You can delete the file from Firebase Storage and remove its Firestore entry
  };

  return (
    <div>
      <h2>Your Files</h2>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            {file.name} - Access Control: {file.accessControl}
            <button onClick={() => handleDownload(file)}>Download</button>
            <button onClick={() => handleDelete(file)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileList;