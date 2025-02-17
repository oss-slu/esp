import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import { FaDownload } from "react-icons/fa6";
import "../styles/OrcaDashboardComponent.css";
import config from "../utils/config";

const OrcaDashboardComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePath, setFilePath] = useState("");
  const [searchTerms, setSearchTerms] = useState([]);
  const [specifyLines, setSpecifyLines] = useState([]);
  const [sections, setSections] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const isUploadedFilesEmpty = uploadedFiles.length === 0;
  const isSearchTermsEmpty = searchTerms.length === 0;
  const isSpecifyLinesEmpty = specifyLines.length === 0;
  const isSectionsEmpty = sections.length === 0;
  const [sameCriteria, setSameCriteria] = useState(false);
  const [previewContent, setPreviewContent] = useState("");
  const [showPreviewModal, setShowPreviewModal] = useState(false); 
  const [selectedFileName, setSelectedFileName] = useState("No file chosen");

  const onFileSelected = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile.type !== "text/plain") {
      alert("Invalid file type. Please upload a .txt file.");
      return;
    }

    if (uploadedFiles.includes(selectedFile.name)) {
      alert(`The file "${selectedFile.name}" has already been uploaded.`);
      return;
    }
    setSelectedFile(selectedFile);
    setSelectedFileName(selectedFile.name);
  };

  const isSearchQueryEnabled = () => {
    return !isUploadedFilesEmpty && searchTerms.length && specifyLines.length && sections.length;
  };

  const handleSpecifyLineChange = (value) => {
    setSpecifyLines([{ value, showInput: value === "FIRST" || value === "LAST" }]);
  };

  const renderSpecifyLine = () => {
    const line = specifyLines[0] || { value: "", showInput: false };
    return (
      <div className="mb-2 d-flex align-items-center">
        <select
          className="form-select me-2"
          id="specifyLinesSelect"
          value={line.value}
          onChange={(e) => handleSpecifyLineChange(e.target.value)}>
          <option value="SELECT">SELECT</option>
          <option value="WHOLE">WHOLE</option>
          <option value="FIRST">FIRST</option>
          <option value="LAST">LAST</option>
        </select>
        {line.showInput && (
          <input
            type="text"
            className="form-control"
            placeholder="Enter line number"
            value={line.lineNumber || ""}
            onChange={(e) => {
              const updatedLines = [{ ...line, lineNumber: e.target.value }];
              setSpecifyLines(updatedLines);
            }}
          />
        )}
      </div>
    );
  };

  const formatSpecifyLines = () => {
    const line = specifyLines[0];
    return line.value === "WHOLE" || line.value === "SELECT"
      ? line.value
      : `${line.value} ${line.lineNumber}`;
  };

  const onUpload = () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    if (uploadedFiles.includes(selectedFile.name)) {
      alert(`The file "${selectedFile.name}" has already been uploaded.`);
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post(`${config.apiBaseUrl}/upload`, formData)
      .then((response) => {
        const uploadedFileName = response.data.file_name;
        setFilePath(response.data.file_path);
        setUploadedFiles((prevUploadedFiles) => [...prevUploadedFiles, uploadedFileName]);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  const removeUploadedFile = (file) => {
    setUploadedFiles((prevUploadedFiles) => {
      const updatedFiles = prevUploadedFiles.filter((f) => f !== file);
      setSelectedFile(null);
      setSelectedFileName("No file chosen");
      const inputElement = document.getElementById("fileInput");
      if (inputElement) {
        inputElement.value = "";
      }
      return updatedFiles;
    });
  };

  const onSubmit = () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const data = {
      file_path: filePath.toString(),
      search_terms: searchTerms,
      sections: sections,
      specify_lines: formatSpecifyLines(),
    };

    axios
      .post(`${config.apiBaseUrl}/find-sections`, data, {
        responseType: "blob",
      })
      .then((response) => {
        const blob = new Blob([response.data]);
        downloadDocument(blob);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          alert("There is no data for the provided search term");
        } else {
          console.error("Error:", error);
        }
      });
  };

  const onSearchQuerySubmit = () => {
    setShowCard(false);
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    } else {
      setShowCard(true);
    }
  };

  const downloadDocument = (blob) => {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const baseFileName = selectedFileName.replace(/\.[^/.]+$/, "");
    const searchTerm = searchTerms.join("_");
  
    let filename = `${date}_${baseFileName}_${searchTerm}.docx`;
    filename = filename.slice(0, 100);
  
    saveAs(blob, filename);
  };

  const handleKeyPress = (e, setterFunc) => {
    if (e.key === "Enter" || e.key === "," || e.key === "Tab") {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value) {
        const values = value.split(",");
        setterFunc((prevValue) => [...prevValue, ...values.map((val) => val.trim().toUpperCase())]);
        e.target.value = "";
      }
    }
  };

  const handleSearchTermBlur = (e, setterFunc) => {
    const value = e.target.value.trim();
    if (value) {
      const values = value.split(",");
      setterFunc((prevValue) => [...prevValue, ...values.map((val) => val.trim().toUpperCase())]);
      e.target.value = "";
    }
  };

  const handleNumSectionsBlur = (e) => {
    const parsedSections = e.target.value
    .split(",")
    .map((val) => val.trim())
    .filter((val) => val !== "");

  setSections(parsedSections);
  };
  
  const removeTag = (index, setterFunc) => {
    setterFunc((prevTerms) => {
      const updatedTerms = [...prevTerms];
      updatedTerms.splice(index, 1);
      return updatedTerms;
    });
  };

  const handleSameCriteriaChange = (e) => {
    setSameCriteria(e.target.checked);
  };

  const handleDelete = () => {
    setSearchTerms([]);
    setSpecifyLines([]);
    setSections([]);
    setShowCard(false);
    setSameCriteria(false);
  };

  const fetchDocumentPreview = () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const data = {
      file_path: filePath.toString(),
      search_terms: searchTerms,
      sections: sections,
      specify_lines: formatSpecifyLines(),
    };

    axios
      .post(`${config.apiBaseUrl}/preview`, data)
      .then((response) => {
        setPreviewContent(response.data.document_content);
        setShowPreviewModal(true);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          alert("There is no data for the provided search term");
        } else {
          console.error("Error fetching preview:", error);
        }
      });
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="text-center">
        <h2 className="mb-4">Extract data from ORCA files to Word documents</h2>
        <div className="mb-3 text-start">
          <label htmlFor="fileUpload" className="mb-2">Upload your ORCA data file:</label>
          <div className="input-group">
          
            <input
              className="form-control"
              type="file"
              id="fileUpload"
              onChange={onFileSelected}
              accept=".txt"
              aria-label="Upload ORCA data file"
            />
            <button className="btn btn-primary" onClick={onUpload}>
              Upload
            </button>
          </div>
        </div>

        <div className="mb-3 text-start">
          <label>Uploaded Files:</label>
          {uploadedFiles.map((file, index) => (
            <span key={index} className="badge bg-secondary me-2 mb-2">
              {file}
              <button
                type="button"
                className="btn-close ms-1"
                aria-label="Remove"
                onClick={() => removeUploadedFile(file)}></button>
            </span>
          ))}
        </div>

        <div className="mb-3 text-start">
          <label htmlFor="searchTermInput" className="mb-2">Enter the terms you wish to search for (txt only):</label>
          <div>
            <input
              type="text"
              className="form-control"
              id="searchTermInput"
              placeholder="E.g., CARTESIAN COORDINATES"
              onKeyPress={(e) => handleKeyPress(e, setSearchTerms)}
              onBlur={(e) => handleSearchTermBlur(e, setSearchTerms)}
            />
            {searchTerms.map((term, index) => (
              <span
                key={index}
                className="badge bg-secondary me-2 mb-2"
                onClick={() => removeTag(index, setSearchTerms)}>
                {term}
                <button type="button" className="btn-close ms-1" aria-label="Remove"></button>
              </span>
            ))}
          </div>
          {searchTerms.length > 1 && (
            <div className="form-check mt-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="sameCriteriaCheckbox"
                checked={sameCriteria}
                onChange={handleSameCriteriaChange}
              />
              <label className="form-check-label" htmlFor="sameCriteriaCheckbox">
                Is the search criteria same for all search terms
              </label>
            </div>
          )}
        </div>

        <div className="mb-3 text-start">
          <label htmlFor="specifyLinesSelect" className="mb-2">Enter how you want the lines specified:</label>
          {renderSpecifyLine()}
        </div>

        <div className="mb-3 text-start">
          <label htmlFor="numSectionsInput" className="mb-2">Number of sections?</label>
          <input
            type="text"
            className="form-control"
            id="numSectionsInput"
            placeholder="ex: 1-5 or 1,2,5"
            defaultValue={sections.join(", ")}
            onBlur={handleNumSectionsBlur}
          />
        </div>

        <div className="button-container">
          <button
            className="btn btn-primary"
            onClick={() => onSearchQuerySubmit()}
            disabled={
              !isSearchQueryEnabled() ||
              isUploadedFilesEmpty ||
              isSearchTermsEmpty ||
              isSpecifyLinesEmpty ||
              isSectionsEmpty
            }>
            Submit Search Query
          </button>
        </div>

        {!isUploadedFilesEmpty &&
          !isSearchTermsEmpty &&
          !isSpecifyLinesEmpty &&
          !isSectionsEmpty &&
          showCard && (
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">Search Query</h5>
                <p className="card-text">Search Terms: {searchTerms.join(", ")}</p>
                <p className="card-text">
                  Specify Lines: {specifyLines[0].value !== "SELECT" && specifyLines[0].value}
                  {specifyLines[0].lineNumber ? `, ${specifyLines[0].lineNumber}` : ""}
                </p>
                <p className="card-text">Sections: {sections.join(", ")}</p>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-primary me-2">Edit</button>
                  <button className="btn btn-danger" onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

        <div className="button-container">
          <button
            className="btn btn-primary"
            onClick={fetchDocumentPreview}
            disabled={
              !searchTerms.length ||
              !specifyLines.length ||
              !sections.length ||
              !selectedFile ||
              isUploadedFilesEmpty
            }>
            Preview
          </button>
        </div>
        {showPreviewModal && (
          <div
            className="modal"
            style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog" style={{ maxWidth: "80vw" }}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Document Preview</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setShowPreviewModal(false)}></button>
                </div>
                <div className="modal-body">
                  <pre>{previewContent}</pre>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowPreviewModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="button-container">
          <button
            className="btn btn-primary"
            onClick={onSubmit}
            disabled={
              !searchTerms.length ||
              !specifyLines.length ||
              !sections.length ||
              !selectedFile ||
              isUploadedFilesEmpty
            }>
            <FaDownload
            size="1.5em"
            title="Download Output"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrcaDashboardComponent;
