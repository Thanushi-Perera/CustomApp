import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Import Axios for making HTTP requests
import "../styles/upload.css"; // Import CSS file for styling

export default function Upload() {
  const { role } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("role", role);

      // Make an HTTP POST request to your backend endpoint
      axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("File uploaded successfully:", response.data);
          // Perform any additional actions after successful upload
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          // Handle errors if any
        });
    } else {
      console.log("No file selected.");
    }
  };

  return (
    <div className="upload-container">
      <div>
        <h1>Select an option</h1>
        <div>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button className="upload-button" onClick={handleUpload}>
          Upload File
        </button>
        <button className="history-button">Manifest History</button>
      </div>
    </div>
  );
}
