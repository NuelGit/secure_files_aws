import React, {useState} from 'react'
import CryptoJS from 'crypto-js'

const EncryptFiles = () => {

    const [file, setFile] = useState(null);
    const [dek, setDEK] = useState(''); // Replace with your DEK
  
    const handleFileChange = (e) => {
      // When a file is selected, store it in the state
      setFile(e.target.files[0]);
    };
  
    const handleEncryptFile = () => {
      if (!file || !dek) {
        alert('Please select a file and provide a DEK.');
        return;
      }
  
      // Read the file as an ArrayBuffer
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileData = event.target.result;
  
        // Encrypt the file data using AES with the DEK
        const encryptedFileData = CryptoJS.AES.encrypt(
          CryptoJS.enc.Hex.parse(fileData),
          CryptoJS.enc.Hex.parse(dek),
          {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
          }
        ).toString();
  
        // Handle the encrypted file data (e.g., upload it to a cloud storage)
  
        alert('File encrypted successfully.');
      };
  
      reader.readAsArrayBuffer(file);
    };
  
    return (
      <div>
        <h2>Encrypt File with AES</h2>
        <input type="file" onChange={handleFileChange} />
        <input
          type="text"
          placeholder="Enter DEK"
          value={dek}
          onChange={(e) => setDEK(e.target.value)}
        />
        <button onClick={handleEncryptFile}>Encrypt File</button>
      </div>
    );
  
}

export default EncryptFiles