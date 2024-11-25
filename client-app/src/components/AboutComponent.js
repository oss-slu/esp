import React from "react";
import { Container } from "react-bootstrap";
import "../styles/AboutComponent.css";

const AboutComponent = () => {
  return (
    <Container className="d-flex justify-content-center mb-4">
      <div className="text-left mb-3 min-vh-100">
        <h2 className="mb-4">About</h2>
        <p className="about-content">
          Our web application specializes in extracting specific details from chemistry log files.
          Users can effortlessly search for information by entering a search term, enabling
          efficient data retrieval. Additionally, our application offers the convenience of
          downloading the extracted data as a Word document, ensuring seamless accessibility and
          usability.
        </p>

        <h3>Example Inputs and Outputs</h3>
        <ul className="examples-list">
        <li>
            <strong>Input 1:</strong> 
            <ul>
              <li><strong>Uploaded File:</strong> ORCA log file (`.txt`)</li>
              <li><strong>Search Terms:</strong> `CARTESIAN COORDINATES`</li>
              <li><strong>Line Specification:</strong> `FIRST`</li>
              <li><strong>Sections:</strong> `1-5`</li>
            </ul>
            <strong>Output:</strong> Extracted data in `output.docx` containing the first occurrence of `CARTESIAN COORDINATES` in sections 1-5.
          </li>
          <li>
            <strong>Input 2:</strong> 
            <ul>
              <li><strong>Uploaded File:</strong> ORCA log file with molecular energy data</li>
              <li><strong>Search Terms:</strong> `TOTAL ENERGY, FINAL GRADIENT`</li>
              <li><strong>Line Specification:</strong> `WHOLE`</li>
              <li><strong>Sections:</strong> `2,4`</li>
            </ul>
            <strong>Output:</strong> Extracted data in `output.docx` containing all lines with `TOTAL ENERGY` and `FINAL GRADIENT` from sections 2 and 4.
          </li>
        </ul>
        
        <h3>Step-by-Step Guide</h3>
        <ol className="how-to-guide">
          <li>Upload a `.txt` file containing ORCA log data using the file upload option.</li>
          <li>Enter keywords in the search field (e.g., `CARTESIAN COORDINATES`). Press **Enter** or use commas to add multiple terms.</li>
          <li>Select how to specify lines (e.g., `FIRST`, `LAST`, `WHOLE`) and provide additional details like line numbers if required.</li>
          <li>Define sections to search within (e.g., `1-5` or `1,3,5`).</li>
          <li>Submit the search query to review and validate your criteria.</li>
          <li>Preview the extracted data using the **Preview** button.</li>
          <li>Download the results as a Word document by clicking the **Download Output** button.</li>
        </ol>

        <h3>Key Features</h3>
        <ul>
          <li><strong>File Upload:</strong> Accepts `.txt` files for ORCA data processing.</li>
          <li><strong>Dynamic Search:</strong> Allows multiple search terms and criteria for precise data extraction.</li>
          <li><strong>Section-Based Selection:</strong> Filters data by user-defined sections for better accuracy.</li>
          <li><strong>Preview Option:</strong> Provides a preview of extracted data before downloading.</li>
          <li><strong>Output Generation:</strong> Creates a Word document (`output.docx`) with the extracted results.</li>
          <li><strong>User-Friendly Interface:</strong> Interactive design with badges, dropdowns, and modals for seamless navigation.</li>
        </ul>

      </div>
    </Container>
  );
};

export default AboutComponent;
