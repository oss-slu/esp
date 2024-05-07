import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import '../styles/TempComponent.css';

const TempPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [searchTerms, setSearchTerms] = useState([]);
  const [specifyLines, setSpecifyLines] = useState([]);
  const [sections, setSections] = useState([]);
  const [useTotalLines, setUseTotalLines] = useState([]);
  const [totalLines, setTotalLines] = useState([]);
  const [showCard, setShowCard] = useState(false);

  const onFileSelected = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedFile(selectedFile);
    setFileName(selectedFile.name.split('/').pop()); 
  };

  const isSearchQueryEnabled = () => {
    return searchTerms.length && specifyLines.length && sections.length;
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
      const uploadedFileName = response.data.filename.split('/').pop();
      setFileName(uploadedFileName); 
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
      search_terms: searchTerms,
      sections: sections,
      specify_lines: specifyLines.join(','),
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
        // setShowCard(true); // Set showCard to true after successful submission
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const onSearchQuerySubmit = () => {
    setShowCard(false)
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }
    else{
      setShowCard(true)
    }
    const search_query_data = {
      file_path: fileName.toString(),
      search_terms: searchTerms,
      sections: sections,
      specify_lines: specifyLines.join(','),
    };

  };

  const downloadDocument = (blob) => {
    saveAs(blob, 'output.docx');
  };

  const handleKeyPress = (e, setterFunc) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value) {
        const values = value.split(','); 
        setterFunc(prevValue => [...prevValue, ...values.map(val => val.trim().toUpperCase())]);
        e.target.value = '';
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

  const [sameCriteria, setSameCriteria] = useState(false);

  const handleSameCriteriaChange = (e) => {
    setSameCriteria(e.target.checked);
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
                onClick={() => removeTag(index, setSearchTerms)}
              >
                {term}
                <button
                  type="button"
                  className="btn-close ms-1"
                  aria-label="Remove"
                ></button>
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
          <input
            type="text"
            className="form-control"
            placeholder="E.g., WHOLE, FIRST X, LAST X"
            value={specifyLines.join(' ')} 
            onChange={(e) => setSpecifyLines(e.target.value.split(/,\s*|\s+/).map(val => val.trim().toUpperCase()))} 
          />
        </div>

        <div className="mb-3 text-start">
          <span>Number of sections?</span>
          <input
            type="text"
            className="form-control"
            placeholder="Input as number..."
            value={sections.join(', ')} 
            onChange={(e) => setSections(e.target.value.split(',').map(val => val.trim()))} 
          />
        </div>

        <div className="mb-3 text-start">
          <span>Use total lines?</span>
          <input
            type="text"
            className="form-control"
            placeholder="TRUE/FALSE"
            value={useTotalLines.join(', ')} 
            onChange={(e) => setUseTotalLines(e.target.value.split(',').map(val => val.trim().toUpperCase()))} 
          />
        </div>

        <div className="mb-3 text-start">
          <span>Total number of lines for output doc?</span>
          <input
            type="text"
            className="form-control"
            placeholder="Input as number..."
            value={totalLines.join(', ')}
            onChange={(e) => setTotalLines(e.target.value.split(',').map(val => val.trim()))}
          />
        </div>

        <div className="button-container">
          <button
            className="btn btn-primary"
            onClick={() => onSearchQuerySubmit()}
            disabled={!isSearchQueryEnabled()}
          >
            Submit Search Query 
          </button>
        </div>

        {showCard && (
          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">Search Query</h5>
              <p className="card-text">Search Terms: {searchTerms.join(', ')}</p>
              <p className="card-text">Lines Specified: {specifyLines.join(', ')}</p>
              <p className="card-text">Sections: {sections.join(', ')}</p>
              <div className="d-flex justify-content-end">
                <button className="btn btn-primary me-2">Edit</button>
                <button className="btn btn-danger">Delete</button>
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
              !selectedFile
            }
          >
            Download Output
          </button>
        </div>

      </div>
    </div>
  );
};

export default TempPage;

