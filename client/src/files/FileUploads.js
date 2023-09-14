import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import CryptoJS from "crypto-js";
import useUser from "../hooks/useUser";

const FileUploads = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { userData, isLoading } = useUser();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  // const handleUpload = () => {
  //   if (selectedFile) {
  //     const fileReader = new FileReader();

  //     fileReader.onload = async () => {
  //       try {
  //         // Generate a random encryption key for AES (256 bits)
  //         const encryptionKey = CryptoJS.lib.WordArray.random(32);

  //         // Encrypt the file using AES
  //         const encryptedFileData = CryptoJS.AES.encrypt(
  //           fileReader.result,
  //           encryptionKey
  //         ).toString();

  //         // Upload the encrypted file data to Firebase Storage
  //         const storageRef = firebase.storage().ref();
  //         const fileRef = storageRef.child(selectedFile.name);

  //         await fileRef.putString(encryptedFileData, 'base64');

  //         alert('File uploaded successfully.');
  //       } catch (error) {
  //         console.error('Error uploading file:', error);
  //         alert('Error uploading file. Please try again.');
  //       }
  //     };

  //     fileReader.readAsDataURL(selectedFile);
  //   } else {
  //     alert('Please select a file to upload.');
  //   }
  // };

  // upload without encryption

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    try {
      // Prepare the data to send to the server
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("user", user);

      // Make a POST request to your server
      const response = await fetch(
        `http://127.0.0.1:4000/upload?user=${userData.uid}`,
        {
          method: "POST",
          body: formData,
        }
      );

      console.log(response);

      if (response.ok) {
        alert("File uploaded successfully.");
      } else {
        const data = await response.json();
        alert(`Error uploading file: ${data.message}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
    }
  };

  return userData ? (
    <div>
      <h2>File Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  ) : (
    <div>You must be logged in to upload a file.</div>
  );
};

export default FileUploads;
