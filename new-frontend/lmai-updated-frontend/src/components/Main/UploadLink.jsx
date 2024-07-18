import React, { useState } from 'react';
import './UploadLink.css'; // Import component-specific CSS file

const UploadLink = ({ onClose }) => {
    const [urls, setUrls] = useState(['']); // To handle multiple links
    const [errorMessage, setErrorMessage] = useState('');

    const handleUrlChange = (event, index) => {
        const newUrls = [...urls];
        newUrls[index] = event.target.value;
        setUrls(newUrls);
    };

    const handleAddUrl = () => {
        setUrls([...urls, '']);
    };

    const handleSubmit = async () => {
        const validUrls = urls.filter(url => url.trim() !== '');
        if (validUrls.length === 0) {
            setErrorMessage('Please enter at least one URL.');
            return;
        }

        // Construct the JSON payload with URLs
        const jsonPayload = {
            documents: validUrls, // Array of valid URLs
        };

        try {
            // Make an asynchronous POST request to the backend
            const response = await fetch("http://127.0.0.1:5000/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(jsonPayload), // Body contains JSON payload
            });

            // Handle the response from the server
            if (response.ok) {
                console.log("Links uploaded successfully.");
                onClose(); // Hide the component
            } else {
                // Handle errors, such as showing a message to the user
                throw new Error("Failed to upload links.");
            }
        } catch (error) {
            console.error("Error:", error.message);
            setErrorMessage('Failed to upload links.');
        }
    };

    return (
        <div className="uploadlink-overlay">
            <div className="uploadlink-modal">
                <h3>Upload Links</h3>
                {urls.map((url, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder="Enter URL"
                        value={url}
                        onChange={(event) => handleUrlChange(event, index)}
                    />
                ))}
                <button onClick={handleAddUrl}>Add multiple</button>
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

export default UploadLink;
