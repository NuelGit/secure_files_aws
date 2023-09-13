import React, {useState} from 'react'
import {Storage} from 'aws-amplify'

const RetrieveFile = () => {
    const [fileUrl, setFileUrl] = useState('');
    const [fileName, setFileName] = useState('');
  
    const handleRetrieveFile = async () => {
      if (!fileName) {
        alert('Please provide a valid file name.');
        return;
      }
  
      try {
        // Retrieve the encrypted file from the S3 bucket
        const url = await Storage.get(fileName);
  
        // Set the file URL to a state variable
        setFileUrl(url);
      } catch (error) {
        console.error('Error retrieving the file:', error);
        alert('An error occurred while retrieving the file.');
      }
    };
  
    return (
      <div>
        <h2>Retrieve Encrypted File from S3</h2>
        <input
          type="text"
          placeholder="Enter File Name"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
        <button onClick={handleRetrieveFile}>Retrieve File</button>
        {fileUrl && (
          <div>
            <p>File URL: {fileUrl}</p>
            <a href={fileUrl} download>
              Download File
            </a>
          </div>
        )}
      </div>
    )
}

export default RetrieveFile