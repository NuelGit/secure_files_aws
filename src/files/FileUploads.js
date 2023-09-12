import React, {useState} from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/storage'
import CryptoJS from 'crypto-js'


const FileUploads = ({user}) => {
    const [selectedFile, setSelectedFile] = useState(null);
  
    const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
    };
  
    const handleUpload = () => {
      if (selectedFile) {
        const fileReader = new FileReader();
  
        fileReader.onload = async () => {
          try {
            // Generate a random encryption key for AES (256 bits)
            const encryptionKey = CryptoJS.lib.WordArray.random(32);
  
            // Encrypt the file using AES
            const encryptedFileData = CryptoJS.AES.encrypt(
              fileReader.result,
              encryptionKey
            ).toString();
  
            // Upload the encrypted file data to Firebase Storage
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(selectedFile.name);
  
            await fileRef.putString(encryptedFileData, 'base64');
  
            alert('File uploaded successfully.');
          } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file. Please try again.');
          }
        };
  
        fileReader.readAsDataURL(selectedFile);
      } else {
        alert('Please select a file to upload.');
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