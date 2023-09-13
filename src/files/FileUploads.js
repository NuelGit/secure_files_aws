import React, {useState} from 'react'
// import firebase from 'firebase/compat/app'
// import 'firebase/storage'
import {Storage} from 'aws-amplify'


const FileUploads = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    // When a file is selected, store it in the state
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    // Encrypt the file here using your chosen encryption algorithm (e.g., AES)

    try {
      // Upload the encrypted file to the S3 bucket
      const result = await Storage.put(file.name, file, {
        contentType: file.type, // Set the content type based on the file type
      });

      console.log('File uploaded successfully:', result);
      alert('File uploaded successfully.');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file.');
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
  }

export default FileUploads