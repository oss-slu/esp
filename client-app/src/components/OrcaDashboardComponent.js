import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import '../styles/DashboardComponent.css'

const OrcaDashboardComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [searchTerms, setSearchTerms] = useState('');
  const [specifyLines, setSpecifyLines] = useState('');
  const [sections, setSections] = useState('');
  const [useTotalLines, setUseTotalLines] = useState('');
  const [totalLines, setTotalLines] = useState('');

  const onFileSelected = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onUpload = () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    axios
      .post('http://localhost:5000/upload', formData)
      .then((response) => {
        console.log('File uploaded successfully:', response);
        setFileName(response.data.filename);
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
  };

  const onSubmit = () => {
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    const data = {
      file_path: fileName.toString(),
      search_terms: searchTerms.split(','),
      sections: sections.split(','),
      specify_lines: specifyLines.toString(),
    };

    if (useTotalLines) {
      data.use_total_lines = useTotalLines;
    }

    if (totalLines) {
      data.total_lines = totalLines;
    }

    axios
      .post('http://localhost:5000/find-sections', data, {
        responseType: 'blob',
      })
      .then((response) => {
        const blob = new Blob([response.data]);
        downloadDocument(blob);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const downloadDocument = (blob) => {
    saveAs(blob, 'output.docx');
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
            />
            <button className="btn btn-primary" onClick={onUpload}>
              Upload
            </button>
          </div>
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
              setTotalLines(inputValue === '' ? '' : parseInt(inputValue));
            }}
          />
        </div>
        <button className="btn btn-primary" onClick={onSubmit} disabled={!searchTerms}>
          Download Output
        </button>
      </div>
    </div>
  );
};

export default OrcaDashboardComponent;

//have to edit this file in order to solve issue #51