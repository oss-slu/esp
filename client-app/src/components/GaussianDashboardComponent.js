import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import "../styles/OrcaDashboardComponentLegacy.css";
import config from "../utils/config";

const GaussianDashboardComponent = () => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [filePaths, setFilePaths] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState("No file chosen");

  const [searchTerms, setSearchTerms] = useState("");
  const [specifyLines, setSpecifyLines] = useState("");
  const [sections, setSections] = useState("");
  const [useTotalLines, setUseTotalLines] = useState("");
  const [totalLines, setTotalLines] = useState("");
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
    if (!selectedFile.length) {
      alert("Please select a file.");
      return;
    }

    const data = {
      file_path: selectedFileName.toString(),
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
          <span>Enter the terms you wish to search for (txt only):</span>
          <input
            type="text"
            className="form-control"
            placeholder="E.g., CARTESIAN COORDINATES"
            value={searchTerms}
            onChange={(e) => setSearchTerms(e.target.value.toUpperCase())}
          />
        </div>

        <div className="mb-3 text-start">
          <span>Enter how you want the lines specified:</span>
          <input
            type="text"
            className="form-control"
            placeholder="E.g., WHOLE, FIRST X, LAST X"
            value={specifyLines}
            onChange={(e) => setSpecifyLines(e.target.value.toUpperCase())}
          />
        </div>

        <div className="mb-3 text-start">
          <span>Number of sections?</span>
          <input
            type="text"
            className="form-control"
            placeholder="Input as number..."
            value={sections}
            onChange={(e) => setSections(e.target.value)}
          />
        </div>

        <div className="mb-3 text-start">
          <span>Use total lines?</span>
          <input
            type="text"
            className="form-control"
            placeholder="TRUE/FALSE"
            value={useTotalLines}
            onChange={(e) => setUseTotalLines(e.target.value.toUpperCase())}
          />
        </div>

        <div className="mb-3 text-start">
          <span>Total number of lines for output doc?</span>
          <input
            type="text"
            className="form-control"
            placeholder="Input as number..."
            value={totalLines}
            onChange={(e) => {
              const inputValue = e.target.value;
              setTotalLines(inputValue === "" ? "" : parseInt(inputValue));
            }}
          />
        </div>
        <button className="btn btn-primary" onClick={fetchDocumentPreview}>
          Preview Output
        </button>
        <div className="buttonSpacing">
          <button className="btn btn-primary" onClick={onSubmit}>
            Download Output
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
