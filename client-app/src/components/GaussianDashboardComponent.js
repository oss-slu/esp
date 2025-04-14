import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import { FaDownload } from "react-icons/fa6";
import "../styles/OrcaDashboardComponentLegacy.css";
import config from "../utils/config";

const GaussianDashboardComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [searchTerms, setSearchTerms] = useState("");
  const [specifyLines, setSpecifyLines] = useState("");
  const [sections, setSections] = useState("");
  const [useTotalLines, setUseTotalLines] = useState("");
  const [totalLines, setTotalLines] = useState("");
  const [previewContent, setPreviewContent] = useState("");

  const onFileSelected = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onUpload = () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post(`${config.apiBaseUrl}/upload`, formData)
      .then((response) => {
        console.log("File uploaded successfully:", response);
        setFileName(response.data.filename);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  const onSubmit = () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const data = {
      file_path: fileName.toString(),
      search_terms: searchTerms.split(","),
      sections: sections.split(","),
      specify_lines: specifyLines.toString(),
    };

    if (useTotalLines) {
      data.use_total_lines = useTotalLines;
    }

    if (totalLines) {
      data.total_lines = totalLines;
    }

    axios
      .post(`${config.apiBaseUrl}/find-sections`, data, {
        responseType: "blob",
      })
      .then((response) => {
        const blob = new Blob([response.data]);
        downloadDocument(blob);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const downloadDocument = (blob) => {
    saveAs(blob, "output.docx");
  };

  const fetchDocumentPreview = () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const data = {
      file_path: fileName.toString(),
      search_terms: searchTerms.split(","),
      sections: sections.split(","),
      specify_lines: specifyLines.toString(),
    };

    if (useTotalLines) {
      data.use_total_lines = useTotalLines;
    }

    if (totalLines) {
      data.total_lines = totalLines;
    }

    axios
      .post(`${config.apiBaseUrl}/preview`, data)
      .then((response) => {
        const documentContent = response.data.document_content;
        setPreviewContent(documentContent);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="text-center">
        <h2 className="mb-4">Extract data from Gaussian files to Word documents</h2>
        <div className="mb-3 text-start">
          <label htmlFor="fileUpload" className="mb-2">
            Upload your Gaussian data file
          </label>
          <div className="input-group">
            <input
            type="file"
            id="fileUpload"
            className="form-control"
            onChange={onFileSelected}
            accept=".log" />
            <button className="btn btn-primary" onClick={onUpload}>
              Upload
            </button>
          </div>
        </div>

        <div className="mb-3 text-start">
          <label>Uploaded Files:</label>
        </div>

        <div className="mb-3 text-start">
          <label htmlFor="searchTermInput" className="mb-2">Enter the terms you wish to search for (txt only):</label>
          <input
            type="text"
            className="form-control"
            id="searchTermInput"
            placeholder="E.g., CARTESIAN COORDINATES"
            value={searchTerms}
            onChange={(e) => setSearchTerms(e.target.value.toUpperCase())}
          />
          <div className="mt-3">
            <span>Search Terms:</span>
          </div>
          <div className="form-check mt-2">
              <input
                className="form-check-input"
                type="checkbox"
              />
              <label className="form-check-label" htmlFor="sameCriteriaCheckbox">
                Is the search criteria same for all search terms
              </label>
            </div>
        </div>
  
        <div className="mb-3 text-start">
          <label htmlFor="specifyLinesSelect" className="mb-2">
            Enter how you want the lines specified:
          </label>
        </div>

        <div className="mb-3 text-start">
          <label htmlFor="numSectionsInput" className="mb-2">
            Number of sections?
          </label>
          <input
            type="text"
            className="form-control"
            id="numSectionsInput"
            placeholder="ex: 1-5 or 1,2,5"
          />
        </div>

        <div className="mb-3 text-start">
          <label htmlFor="useTotalLinesInput" className="mb-2">Use total lines?</label>
          <input
            type="text"
            className="form-control"
            id="useTotalLinesInput"
            placeholder="TRUE/FALSE"
            value={useTotalLines}
            onChange={(e) => setUseTotalLines(e.target.value.toUpperCase())}
          />
        </div>

        <div className="mb-3 text-start">
          <label htmlFor="numLinesInput" className="mb-2">Total number of lines for output doc?</label>
          <input
            type="text"
            className="form-control"
            id="numLinesInput"
            placeholder="Input as number..."
            value={totalLines}
            onChange={(e) => {
              const inputValue = e.target.value;
              setTotalLines(inputValue === "" ? "" : parseInt(inputValue));
            }}
          />
        </div>
        <div className="button-group">
          <button className="btn btn-primary" title="Submit Search Query">
            Submit Search Query
          </button>
          <button className="btn btn-primary" onClick={fetchDocumentPreview}>
            Preview
          </button>
          <button className="btn btn-primary" onClick={onSubmit}>
            Download <FaDownload size="1.2em"/>
          </button>
        </div>


        {previewContent && (
          <div className="document-preview">
            <h3>Document Preview</h3>
            <div className="preview-box">
              <pre>{previewContent}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GaussianDashboardComponent;
