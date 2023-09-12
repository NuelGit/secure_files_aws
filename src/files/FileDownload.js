import React, {useState} from 'react'

const FileDownload = () => {
    const [fileUrl, setFileUrl] = useState('');
    const [fileName, setFileName] = useState('');
  
    const handleDownload = () => {
      if (!fileUrl || !fileName) {
        alert('Please provide a valid file URL and file name.');
        return;
      }
  
      // Create a hidden anchor element to trigger the download
      const anchor = document.createElement('a');
      anchor.href = fileUrl;
      anchor.download = fileName;
      anchor.style.display = 'none';
      document.body.appendChild(anchor);
  
      // Trigger the download
      anchor.click();
  
      // Clean up the anchor element
      document.body.removeChild(anchor);
    };
  
    return (
      <div>
        <h2>File Download</h2>
        <input
          type="text"
          placeholder="Enter File URL"
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter File Name"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
        <button onClick={handleDownload}>Download File</button>
      </div>
    );
}

export default FileDownload