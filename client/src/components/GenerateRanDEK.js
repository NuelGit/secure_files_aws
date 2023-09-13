import React, {useState} from 'react'
import CryptoJS from 'crypto-js';

const GenerateRanDEK = () => {

      const [dek, setDEK] = useState('');
    
      const handleGenerateDEK = () => {
        // Generate a random DEK (128 bits or 256 bits, depending on your requirements)
        const randomBytes = CryptoJS.lib.WordArray.random(32); // 256 bits (32 bytes)
    
        // Convert the random bytes to a hexadecimal string
        const dekHex = randomBytes.toString(CryptoJS.enc.Hex);
    
        // Set the generated DEK in the state
        setDEK(dekHex);
    
        alert('Random DEK generated successfully.');
      };
    
      return (
        <div>
          <h2>Generate Random DEK</h2>
          <button onClick={handleGenerateDEK}>Generate DEK</button>
          {dek && <div>Random DEK: {dek}</div>}
        </div>
      );
    }
          

export default GenerateRanDEK