import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import { FaDownload } from "react-icons/fa6";
import "../styles/OrcaDashboardComponentLegacy.css";
import config from "../utils/config";

const GaussianDashboardComponent = () => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [filePaths, setFilePaths] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState("No file chosen");

  const [sameCriteria, setSameCriteria] = useState(false);
  const [searchTerms, setSearchTerms] = useState([]);
  const [specifyLines, setSpecifyLines] = useState("");
  const [sections, setSections] = useState([]);
  const [sameCriteria, setSameCriteria] = useState(false);
  const [previewContent, setPreviewContent] = useState("");

  const onFileSelected = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) => {
      if (!file.name.toLowerCase().endsWith(".log")) {
        alert(`Invalid file type: ${file.name}. Only .log files are allowed for Gaussian.`);
        return false;
      }
      if (uploadedFiles.includes(file.name)) {
        alert(`The file "${file.name}" has already been uploaded.`);
        return false;
      }
      return true;
    });
    setSelectedFile(validFiles);
  };

  const onUpload = () => {
    if (!selectedFile.length) {
      alert("Please choose a file to upload.");
      return;
    }

    selectedFile.forEach((file) => {
      const formData = new FormData();
      formData.append("file", file);
      axios
        .post(`${config.apiBaseUrl}/upload`, formData)
        .then((response) => {
          setUploadedFiles((prev) => [...prev, response.data.file_name]);
          setFilePaths((prev) => [...prev, response.data.file_path]);
          setSelectedFileName(file.name);
        })
        .catch((error) => console.error("Upload error:", error));
    });

    setSelectedFile([]);
    document.getElementById("fileUpload").value = "";
  };

  const removeUploadedFile = (file) => {
    setUploadedFiles((prevUploadedFiles) => {
      const updatedFiles = prevUploadedFiles.filter((f) => f !== file);
      if (selectedFile && selectedFile.name === file) {
        setSelectedFile(null);
        setSelectedFileName("File Upload"); 
        const inputElement = document.getElementById("fileUpload");
        if (inputElement) {
          inputElement.value = ""; 
        }
      }
      return updatedFiles;
    });
  };
  
  const truncateName = (fileName, maxLength = 70) => {
    if (fileName.length <= maxLength) return fileName;
    const truncated = fileName.substring(0, maxLength - 3);
    return `${truncated}...`;
  };

  const onSubmit = () => {
    if (!filePaths.length) {
      alert("Please select a file.");
      return;
    }

    const data = {
      file_path: selectedFileName.toString(),
      search_terms: searchTerms,
      sections: sections.split(","),
      specify_lines: specifyLines.toString(),
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
        console.error("Error:", error);
      });
  };

  const handleSameCriteriaChange = (e) => {
    setSameCriteria(e.target.checked);
  };
  
  const handleNumSectionsBlur = (e) => {
    const input = e.target.value;
    let parsedSections = new Set();

    input.split(",").forEach((part) => {
      part = part.trim();
      if (part.includes("-")) {
        const [start, end] = part.split("-").map((num) => parseInt(num.trim(), 10));
        if (!isNaN(start) && !isNaN(end) && start <= end) {
          for (let i = start; i <= end; i++) {
            parsedSections.add(i);
          }
        }
      } else {
        const num = parseInt(part, 10);
        if (!isNaN(num)) {
          parsedSections.add(num);
        }
      }
    });

    setSections(Array.from(parsedSections).sort((a, b) => a - b));
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

  const handleSpecifyLineChange = (value) => {
    setSpecifyLines([{ value, showInput: value === "FIRST" || value === "LAST" }]);
  };

  const formatSpecifyLines = () => {
    const line = specifyLines[0];
    return line.value === "WHOLE" || line.value === "SELECT"
      ? line.value
      : `${line.value} ${line.lineNumber}`;
  };

  const downloadDocument = (blob) => {
    saveAs(blob, "output.docx");
  };

  const handleKeyPress = (e, setterFunc) => {
    if (e.key === "Enter" || e.key === "," || e.key === "Tab") {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value) {
        const values = value.split(",");
        setterFunc((prevValue) => {
          const updated = [...prevValue, ...values.map((val) => val.trim().toUpperCase())];
          return updated;
        });
        e.target.value = "";
      }
    }
  };

  const handleSearchTermBlur = (e, setterFunc) => {
    const value = e.target.value.trim();
    if (value) {
      const values = value.split(",");
      setterFunc((prevValue) => {
        const updated = [...prevValue, ...values.map((val) => val.trim().toUpperCase())];
        return updated;
      });
      e.target.value = "";
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

  const fetchDocumentPreview = () => {
    if (!selectedFile.length) {
      alert("Please select a file.");
      return;
    }

    const data = {
      file_path: selectedFileName.toString(),
      search_terms: searchTerms,
      sections: sections.split(","),
      specify_lines: formatSpecifyLines(),
    };

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
             className="form-control" 
             type="file" 
             id="fileUpload"
             onChange={onFileSelected} 
             accept=".log" 
             multiple
             aria-label="Upload Gaussian data file"
            />
            <button className="btn btn-primary" onClick={onUpload}>
              Upload
            </button>
          </div>
        </div>

        <div className="mb-3 text-start">
          <label>Uploaded Files:</label>
          {uploadedFiles.map((file, index) => (
            <span key={index} className="badge bg-secondary ms-1 me-1 mb-2">
              {truncateName(file, 40)}
              <button
                type="button"
                className="btn-close ms-1"
                aria-label="Remove"
                onClick={() => removeUploadedFile(file)}></button>
            </span>
          ))}
        </div>

        <div className="mb-3 text-start">
          <label htmlFor="searchTermInput" className="mb-2">
            Enter the terms you wish to search for (txt only):
          </label>
          <div>
            <input
              type="text"
              className="form-control"
              id="searchTermInput"
            placeholder="E.g., CARTESIAN COORDINATES"
              onKeyPress={(e) => handleKeyPress(e, setSearchTerms)}
              onBlur={(e) => handleSearchTermBlur(e, setSearchTerms)}
            />
            <div className="mt-3">
            <span>Search Terms:</span>
              {searchTerms.map((term, index) => (
                <span
                  key={index}
                  className="badge bg-secondary ms-1 me-1 mb-2"
                  onClick={() => removeTag(index, setSearchTerms)}>
                  {truncateName(term, 70)}
                  <button type="button" className="btn-close ms-1" aria-label="Remove"></button>
                </span>
            ))}
            </div>
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
          <div className="mt-3">
            <span>Search Terms:</span>
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
          <label htmlFor="specifyLinesSelect" className="mb-2">
            Enter how you want the lines specified:
          </label>
          {renderSpecifyLine()}
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
            defaultValue={sections.join(", ")}
            onBlur={handleNumSectionsBlur}
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
