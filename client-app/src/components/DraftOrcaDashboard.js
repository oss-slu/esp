import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import "../styles/TempComponent.css";

const DraftOrcaDashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
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

  const onFileSelected = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile.type !== "text/plain") {
      alert("Invalid file type. Please upload a .txt file.");
      return;
    }
    setSelectedFile(selectedFile);
    setFileName(selectedFile.name.split(/[/\\]/).pop());
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

  const onUpload = () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post("http://localhost:5001/upload", formData)
      .then((response) => {
        const uploadedFileName = response.data.filename.split(/[/\\]/).pop();
        setFileName(response.data.filename);
        setUploadedFiles((prevUploadedFiles) => [...prevUploadedFiles, uploadedFileName]);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  const removeUploadedFile = (fileName) => {
    // You can add logic here to delete the file from the server if needed
    setUploadedFiles((prevUploadedFiles) => prevUploadedFiles.filter((file) => file !== fileName));
  };

  const onSubmit = () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const data = {
      file_path: fileName.toString(),
      search_terms: searchTerms,
      sections: sections,
      specify_lines: specifyLines.join(","),
    };

    axios
      .post("http://localhost:5001/find-sections", data, {
        responseType: "blob",
      })
      .then((response) => {
        const blob = new Blob([response.data]);
        downloadDocument(blob);
        // setShowCard(true); // Set showCard to true after successful submission
      })
      .catch((error) => {
        console.error("Error:", error);
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
    saveAs(blob, "output.docx");
  };

  const handleKeyPress = (e, setterFunc) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value) {
        const values = value.split(",");
        setterFunc((prevValue) => [...prevValue, ...values.map((val) => val.trim().toUpperCase())]);
        e.target.value = "";
      }
    }
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

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="text-center">
        <h2 className="mb-4">Extract data from ORCA files to Word documents</h2>
        <div className="mb-3 text-start">
          <span>Upload your ORCA data file</span>
          <div className="input-group">
            <input
              type="file"
              className="form-control"
              onChange={onFileSelected}
              accept=".txt"
              value=""
              aria-label="Upload ORCA data file"
            />
            <button className="btn btn-primary" onClick={onUpload}>
              Upload
            </button>
          </div>
        </div>

        <div className="mb-3 text-start">
          <span>Uploaded Files:</span>
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
          <span>Enter the terms you wish to search for (txt only):</span>
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="E.g., CARTESIAN COORDINATES"
              onKeyPress={(e) => handleKeyPress(e, setSearchTerms)}
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
          <span>Enter how you want the lines specified:</span>
          {renderSpecifyLine()}
        </div>

        <div className="mb-3 text-start">
          <span>Number of sections?</span>
          <input
            type="text"
            className="form-control"
            placeholder="ex: 1-5 or 1,2,5"
            value={sections.join(", ")}
            onChange={(e) => setSections(e.target.value.split(",").map((val) => val.trim()))}
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
            onClick={onSubmit}
            disabled={
              !searchTerms.length ||
              !specifyLines.length ||
              !sections.length ||
              !selectedFile ||
              isUploadedFilesEmpty
            }>
            Download Output
          </button>
        </div>
      </div>
    </div>
  );
};

export default DraftOrcaDashboard;
