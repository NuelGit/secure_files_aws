import React, { useState } from 'react';
import './FileAccessControl.css'; // Import the associated CSS file

function FileAccessControl() {
  const [accessSettings, setAccessSettings] = useState({
    read: false,
    write: false,
    delete: false,
  });

  const handleAccessChange = (event) => {
    const { name, checked } = event.target;
    setAccessSettings((prevSettings) => ({
      ...prevSettings,
      [name]: checked,
    }));
  };

  const handleSaveAccessSettings = () => {
    // Save the access settings to your backend or storage
    console.log('Access settings saved:', accessSettings);
  };

  return (
    <div className="access-control-container">
      <h2>Access Control</h2>
      <div className="access-options">
        <label>
          <input
            type="checkbox"
            name="read"
            checked={accessSettings.read}
            onChange={handleAccessChange}
          />{' '}
          Read
        </label>
        <label>
          <input
            type="checkbox"
            name="write"
            checked={accessSettings.write}
            onChange={handleAccessChange}
          />{' '}
          Write
        </label>
        <label>
          <input
            type="checkbox"
            name="delete"
            checked={accessSettings.delete}
            onChange={handleAccessChange}
          />{' '}
          Delete
        </label>
      </div>
      <button onClick={handleSaveAccessSettings}>Save Access Settings</button>
    </div>
  );
}

export default FileAccessControl;