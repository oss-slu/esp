import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import { FaDownload } from "react-icons/fa6";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "../styles/OrcaDashboardComponent.css";
import config from "../utils/config";

const OrcaDashboardComponent = () => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [filePaths, setFilePaths] = useState([]);
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
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) => {
      if (file.type !== "text/plain") {
        alert(`Invalid file type: ${file.name}`);
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

  const isSearchQueryEnabled = () => {
    const line = specifyLines[0] || {};
    const lineNumberRequired = line.value === "FIRST" || line.value === "LAST";
    const isLineNumberMissing = lineNumberRequired && (!line.lineNumber || line.lineNumber.trim() === "");
    return !isUploadedFilesEmpty && searchTerms.length && specifyLines.length && sections.length && !isLineNumberMissing;
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

  const onSubmitWithFormat = (format) => {
    if (!filePaths.length) {
      alert("Please select a file.");
      return;
    }
  
    const data = {
      file_paths: filePaths,
      search_terms: searchTerms,
      sections: sections,
      specify_lines: formatSpecifyLines(),
      output_format: format
    };
  
    axios
      .post(`${config.apiBaseUrl}/find-sections`, data, {
        responseType: "blob",
      })
      .then((response) => {
        const mimeMap = {
          docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          pdf: "application/pdf",
          txt: "text/plain"
        };
  
        const blob = new Blob([response.data], { type: mimeMap[format] || "application/octet-stream" });
  
        const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
        const baseFileName = selectedFileName.replace(/\.[^/.]+$/, "");
        const searchTerm = searchTerms.join("_").slice(0, 50);
        let fileName = `${date}_${baseFileName}_${searchTerm}.${format}`;
        fileName = truncateName(fileName, 100);
        saveAs(blob, fileName);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) {
            alert("There is no data for the provided search term");
          } else {
            alert(`Error ${error.response.status}: ${error.response.statusText}`);
          }
        } else {
          alert("Download failed. Check console.");
          console.error("Download error:", error);
        }
      });
  };  

  const onSearchQuerySubmit = () => {
    setShowCard(false);
    if (!filePaths.length) {
      alert("Please select a file.");
      return;
    } else {
      setShowCard(true);
    }
  };

  const truncateName = (fileName, maxLength = 40) => {
    if (fileName.length <= maxLength) return fileName;
    const truncated = fileName.substring(0, maxLength - 3);
    return `${truncated}...`;
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

  const line = specifyLines[0] || {};
  const lineNumberRequired = line.value === "FIRST" || line.value === "LAST";
  const isLineNumberMissing = lineNumberRequired && (!line.lineNumber || line.lineNumber.trim() === "");
  const isDisabled =
    !searchTerms.length ||
    !specifyLines.length ||
    !sections.length ||
    isUploadedFilesEmpty ||
    isLineNumberMissing;

    const fetchDocumentPreview = () => {
      if (!filePaths.length) {
        alert("Please select a file.");
        return;
      }
    
      const data = {
        file_paths: filePaths,
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowPreviewModal(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="text-center">
        <h2 className="mb-4">Extract data from ORCA files to Word documents</h2>
        <div className="mb-3 text-start">
          <label htmlFor="fileUpload" className="mb-2">
            Upload your ORCA data file:
          </label>
          <div className="input-group">
            <input
              className="form-control"
              type="file"
              id="fileUpload"
              onChange={onFileSelected}
              accept=".txt"
              multiple
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
                  {truncateName(term, 40)}
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
          <div className="button-container">
            <button
              className="btn btn-primary"
              onClick={onSearchQuerySubmit}
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
                    <button
                      className="btn btn-secondary"
                      onClick={() => setShowPreviewModal(false)}>
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
              onClick={fetchDocumentPreview}
              disabled={isDisabled}>
              Preview
            </button>
          </div>

          <div className="button-container">
            <DropdownButton
              id="dropdown-download-button"
              title={<span>Download <FaDownload size="1.2em"/></span>}
              variant="primary"
              disabled={isDisabled}
            >
              <Dropdown.Item onClick={() => onSubmitWithFormat("docx")}>Download as .docx</Dropdown.Item>
              <Dropdown.Item onClick={() => onSubmitWithFormat("pdf")}>Download as .pdf</Dropdown.Item>
              <Dropdown.Item onClick={() => onSubmitWithFormat("txt")}>Download as .txt</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrcaDashboardComponent;
