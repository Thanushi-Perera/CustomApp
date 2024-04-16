import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import "../styles/upload.css"; // Import CSS file for styling
import Swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router-dom";

export default function Upload() {

  const navigate = useNavigate();

  const [selectedFiles, setSelectedFiles] = useState(null);
  const [jobNumber, setJobNumber] = useState(null);
  const [jobs, setJobs] = useState([]);

  const userRole = localStorage.getItem("role");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/documents/jobs")
      .then((response) => {
        setJobs(Object.values(response.data.data));
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, [])

  const handleFileChange = (event, fileName) => {
    setSelectedFiles((prev) => ({
      ...prev,
      [fileName]: event.target.files[0],
    }));
  };

  const handleUpload = () => {
    if (!jobNumber) {
      alert("Please enter a job number");
    } else if (!selectedFiles) {
      alert("Please select a file");
    }else if (
      (userRole === "portauthority" &&
        selectedFiles["BL"] &&
        selectedFiles["DOF"] &&
        selectedFiles["DOB"] &&
        selectedFiles["IVF"] &&
        selectedFiles["IVB"]) ||
      (userRole === "shippinglineagent" &&
        selectedFiles["MFF"] &&
        selectedFiles["MFB"])
    ) {
      for (const [key, value] of Object.entries(selectedFiles)) {
        const formData = new FormData();
        formData.append("file", value);
        formData.append("type", key);

        axios
          .post("https://1759-2402-4000-2180-7458-a957-905b-df66-8596.ngrok-free.app//upload-s3", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            axios
              .post(
                "http://localhost:4000/api/v1/documents",
                { ...response.data, JobNumber: jobNumber, DocType: key }
              )
              .catch((error) => {
                alert("Error uploading file. Please try again");
                console.error("Error uploading file:", error);
                return;
              });
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
            alert("Error uploading file. Please try again");
          });
      }
    } else {
      alert("Please select all files");
    }
  };

  const handleAnalyseDocs = () => {
    if (!jobNumber) {
      alert("Please enter a job number");
    } else {
      axios
        .get(`http://localhost:4000/api/v1/documents/analyze/${jobNumber}`)
        .then((response) => {
          // Perform any additional actions after successful analysis
          if (response.data.success) {
            if (response.data.data.status === "Matching") {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Documents are matching",
              });
            } else if (response.data.data.status === "Partially matching") {
              Swal.fire({
                icon: "warning",
                title: "Warning!",
                text: "Documents are partially matching",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Documents are not matching",
              });
            }
          } else {
            Swal.fire({
              icon: "error",
              title: "Error analyzing documents",
              text: response.data.message,
            });
          }
        })
        .catch((error) => {
          console.error("Error analyzing documents:", error);
          const responseData = error.response.data;
          Swal.fire({
            icon: "error",
            title: "Error analyzing documents!",
            text: responseData.message,
          })
        });
    }
  }

  return (
    <div className="upload-container">
      {userRole === "portauthority" ? (
        <div>
          <h1>Select all files</h1>
          <div>
            <label htmlFor="shippingManifestFront" className="fileInputLabel">
              Job Number:{" "}
            </label>
            <input
              type="text"
              onChange={(e) => setJobNumber(e.target.value)}
              name="jobNumber"
            />
          </div>
          <div>
            <label htmlFor="billOfLading" className="fileInputLabel">
              Bill of Lading (BL):{" "}
            </label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "BL")}
              name="billOfLading"
            />
          </div>
          <div>
            <label htmlFor="deliveryOrderFront" className="fileInputLabel">
              Delivery Order Front:{" "}
            </label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "DOF")}
              name="deliveryOrderFront"
            />
          </div>
          <div>
            <label htmlFor="deliveryOrderBack" className="fileInputLabel">
              Delivery Order Back:{" "}
            </label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "DOB")}
              name="deliveryOrderBack"
            />
          </div>
          <div>
            <label htmlFor="invoiceFront" className="fileInputLabel">
              Invoice Front:{" "}
            </label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "IVF")}
              name="invoiceFront"
            />
          </div>
          <div>
            <label htmlFor="invoiceBack" className="fileInputLabel">
              Invoice Back:{" "}
            </label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "IVB")}
              name="invoiceBack"
            />
          </div>
          <button className="upload-button" onClick={handleUpload}>
            Upload Files
          </button>
          <button className="history-button">Manifest History</button>
        </div>
      ) : userRole === "shippinglineagent" ? (
        <div>
          <h1>Select all files</h1>
          <div>
            <label htmlFor="shippingManifestFront" className="fileInputLabel">
              Job Number:{" "}
            </label>
            <input
              type="text"
              onChange={(e) => setJobNumber(e.target.value)}
              name="jobNumber"
            />
          </div>
          <div>
            <label htmlFor="shippingManifestFront" className="fileInputLabel">
              Shipping manifest front:{" "}
            </label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "MFF")}
              name="shippingManifestFront"
            />
          </div>
          <div>
            <label htmlFor="shippingManifestBack" className="fileInputLabel">
              Shipping manifest back:{" "}
            </label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "MFB")}
              name="shippingManifestBack"
            />
          </div>
          <button className="upload-button" onClick={handleUpload}>
            Upload File
          </button>
          <button className="history-button">Manifest History</button>
        </div>
      ) : (
        <div>
        <div>
          <div>
            <label htmlFor="shippingManifestFront" className="fileInputLabel">
              Job Number:{" "}
            </label>
            <input
              type="text"
              onChange={(e) => setJobNumber(e.target.value)}
              name="jobNumber"
            />
          </div>
          <button className="upload-button" onClick={handleAnalyseDocs}>Analyze docs</button>
        </div>
        <div>
          <h1>Jobs</h1>
          <div>
            {jobs.map((job) => (
              <div key={job.JobNumber} onClick={() => navigate(`/job/${job.JobNumber}`)}>
                <FontAwesomeIcon icon={faFolder} />
                <p>{job.voyageNo ?? job.JobNumber}</p>
              </div>
            ))}
          </div>
        </div>
        </div>
      )}
    </div>
  );
}
