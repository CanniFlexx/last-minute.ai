import React, { useState } from 'react';
import './UploadPdf.css'; // Import component-specific CSS file

const UploadPdf = ({ onClose }) => {
  const [files, setFiles] = useState([]); // To handle multiple PDF files
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    // Collect all selected files and filter only PDF files
    const selectedFiles = Array.from(event.target.files).filter(file =>
      file.type === 'application/pdf'
    );
    setFiles(selectedFiles);
    // Reset error message when files are selected
    setErrorMessage('');
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      setErrorMessage('Please select at least one PDF document.');
      return;
    }

    // Create a FormData object to hold the files
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      // Make an asynchronous POST request to the backend
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData, // Body contains only files
      });

      // Handle the response from the server
      if (response.ok) {
        console.log("PDFs uploaded successfully.");
        onClose(); // Hide the component
      } else {
        // Handle errors, such as showing a message to the user
        throw new Error("Failed to upload PDFs.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage('Failed to upload PDFs.');
    }
  };

  return (
    <div className="upload-overlay">
      <div className="upload-modal">
        <h2>Upload PDF Documents</h2>
        <input type="file" multiple accept=".pdf" onChange={handleFileChange} />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <br />
        <br />
        <button onClick={handleSubmit}>Submit</button>
        <span> </span>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default UploadPdf;

