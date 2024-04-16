import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Job = () => {
  const { jobNumber } = useParams();

  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/documents/job/${jobNumber}`)
      .then((response) => {
        setDocuments(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, [jobNumber]);

  const handleAnalyseDocs = () => {
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
        });
      });
  };

  return (
    <div>
      <h1>Job Details</h1>
      <h3>Job Number: {jobNumber}</h3>
      <button className="upload-button" onClick={handleAnalyseDocs}>Analyze docs</button>
      <h3>Documents</h3>
      {documents.map((doc) => (
        <div key={doc._id}>
          <h5>Document Type: {doc.DocType}</h5>
          <h5>{doc.Voyage_No ? `Voyage No: ${doc.Voyage_No}` : null}</h5>
          <image src={doc.ImageURL} alt="Document" />
        </div>
      ))}
    </div>
  );
};

export default Job;
