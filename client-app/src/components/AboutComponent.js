import React from "react";
import { Container } from "react-bootstrap";
import "../styles/AboutComponent.css";

const AboutComponent = () => {
  return (
    <Container className="d-flex justify-content-center mb-4">
      <div className="text-left mb-3 min-vh-100">
        <h2 className="mb-4">About Electronic Structure Parser</h2>
        <p className="about-content">
          Our web application specializes in extracting specific details from chemistry log files.
          Users can effortlessly search for information by entering a search term, enabling
          efficient data retrieval. Additionally, our application offers the convenience of
          downloading the extracted data as a Word document, ensuring seamless accessibility and
          usability.
        </p>
        <p className="about-content">
          Access the application here:{" "}
          <a
            href="https://raven-intent-mentally.ngrok-free.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Electronic Structure Parser
          </a>
        </p>

        <h3>Example Inputs and Outputs</h3>
        <ul className="examples-list">
        <li>
            <strong>Input 1:</strong> 
            <ul>
              <li><strong>Uploaded File:</strong> ORCA log file (`.txt`)</li>
              <li><strong>Search Terms:</strong> `CARTESIAN COORDINATES`</li>
              <li><strong>Line Specification:</strong> `FIRST`</li>
              <li><strong>Sections:</strong> `1`</li>
            </ul>
            <strong>Output:</strong> Extracted data in `output.docx` containing the first occurrence of `CARTESIAN COORDINATES` in section 1.
          </li>
          <li>
            <strong>Input 2:</strong> 
            <ul>
              <li><strong>Uploaded File:</strong> ORCA log file with molecular energy data</li>
              <li><strong>Search Terms:</strong> `TOTAL ENERGY, FINAL GRADIENT`</li>
              <li><strong>Line Specification:</strong> `WHOLE`</li>
              <li><strong>Sections:</strong> `1,2`</li>
            </ul>
            <strong>Output:</strong> Extracted data in `output.docx` containing all lines with `TOTAL ENERGY` and `FINAL GRADIENT` from sections 1 and 2.
          </li>
        </ul>
        
        <h3>Step-by-Step Guide</h3>
        <ol className="how-to-guide">
          <li>Upload a `.txt` file containing ORCA log data using the file upload option.</li>
          <li>Enter keywords in the search field (e.g., `CARTESIAN COORDINATES`). Press **Enter** or use commas to add multiple terms.</li>
          <li>Select how to specify lines (e.g., `FIRST`, `LAST`, `WHOLE`) and provide additional details like line numbers if required.</li>
          <li>Define sections to search within (e.g., `1-2` or `1,2`).</li>
          <li>Submit the search query to review and validate your criteria.</li>
          <li>Preview the extracted data using the **Preview** button.</li>
          <li>Download the results as a Word document by clicking the **Download Output** button.</li>
        </ol>

        <h3>Key Features</h3>
        <ul>
          <li><strong>File Upload:</strong> Accepts `.txt` files for ORCA data processing.</li>
          <li><strong>Search Functionality:</strong> Allows users to search for a single term in the uploaded file for precise data extraction. (Support for multiple search terms is planned for a future update.)</li>
          <li><strong>Section-Based Selection:</strong> Filters data by user-defined sections for better accuracy.</li>
          <li><strong>Preview Option:</strong> Provides a preview of extracted data before downloading.</li>
          <li><strong>Output Generation:</strong> Creates a Word document (`output.docx`) with the extracted results.</li>
          <li><strong>User-Friendly Interface:</strong> Interactive design with badges, dropdowns, and modals for seamless navigation.</li>
        </ul>

        <h3>Tutorial Video</h3>
        <div className="tutorial-video">
          <p>Watch this video to learn how to use the application:</p>
          <video width="560" height="315" controls>
            <source src="/tutorialVideo.mov" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </Container>
  );
};

export default AboutComponent;
