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
  const [sections, setSections] = useState([]);
  const [sameCriteria, setSameCriteria] = useState(false);
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

  const fetchDocumentPreview = () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const data = {
      file_path: fileName.toString(),
      search_terms: searchTerms.split(","),
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
