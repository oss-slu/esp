import React from "react";
import { Container } from "react-bootstrap";
import "../styles/AboutComponent.css";

const AboutComponent = () => {
  return (
    <Container className="about-container">
      <div className="about-section">
        <h2>About Electronic Structure Parser</h2>
        <p>
          Our web application specializes in extracting specific details from chemistry log files.
          Users can now upload multiple files simultaneously and search for multiple terms at once,
          making batch data extraction more efficient. Each result is clearly labeled and organized
          by file and section for easier review. Additionally, the application includes a preview
          feature for verifying results before download and supports exporting data in .txt, .docx,
          or .pdf formats, ensuring maximum flexibility and accessibility.
        </p>
        <p>
          Access the application here:{" "}
          <a
            href="https://raven-intent-mentally.ngrok-free.app/"
            target="_blank"
            rel="noopener noreferrer">
            Electronic Structure Parser
          </a>
        </p>
      </div>

      <div className="about-section">
        <h3>Example Inputs and Outputs</h3>
        <ul className="examples-list">
          <li>
            <strong>Input 1:</strong>
            <ul>
              <li>
                <strong>Uploaded File:</strong> ORCA log file (`.txt`)
              </li>
              <li>
                <strong>Search Terms:</strong> `CARTESIAN COORDINATES`
              </li>
              <li>
                <strong>Line Specification:</strong> `FIRST`
              </li>
              <li>
                <strong>Sections:</strong> `1`
              </li>
            </ul>
            <strong>Output:</strong> Extracted data in `output.docx` containing the first occurrence
            of `CARTESIAN COORDINATES` in section 1.
          </li>
          <li>
            <strong>Input 2:</strong>
            <ul>
              <li>
                <strong>Uploaded File:</strong> ORCA log file with molecular energy data
              </li>
              <li>
                <strong>Search Terms:</strong> `TOTAL ENERGY, FINAL GRADIENT`
              </li>
              <li>
                <strong>Line Specification:</strong> `WHOLE`
              </li>
              <li>
                <strong>Sections:</strong> `1,2`
              </li>
            </ul>
            <strong>Output:</strong> Extracted data in `output.docx` containing all lines with
            `TOTAL ENERGY` and `FINAL GRADIENT` from sections 1 and 2.
          </li>
        </ul>
      </div>

      <div className="about-section">
        <h3>Step-by-Step Guide</h3>
        <ol className="how-to-guide">
          <li>Upload a `.txt` file containing ORCA log data using the file upload option.</li>
          <li>
            Enter keywords in the search field (e.g., `CARTESIAN COORDINATES`). Press{" "}
            <strong>Enter</strong> or use commas to add multiple terms.
          </li>
          <li>
            Select how to specify lines (e.g., `FIRST`, `LAST`, `WHOLE`) and provide additional
            details like line numbers if required.
          </li>
          <li>Define sections to search within (e.g., `1-2` or `1,2`).</li>
          <li>Submit the search query to review and validate your criteria.</li>
          <li>
            Preview the extracted data using the <strong>Preview</strong> button.
          </li>
          <li>
            Download the results as a .txt, .docx, or .pdf file by clicking the{" "}
            <strong>Download Output</strong> button.
          </li>
        </ol>
      </div>

      <div className="about-section">
        <h3>Key Features</h3>
        <ul>
          <li>
            <strong>File Upload:</strong> Accepts `.txt` files for ORCA data processing, now
            supporting multiple file inputs for batch data extraction.
          </li>
          <li>
            <strong>Search Functionality:</strong> Allows users to search for one or more terms in
            the uploaded files for precise data extraction.{" "}
          </li>
          <li>
            <strong>Section-Based Selection:</strong> Filters data by user-defined sections, with
            support for searching across a range of sections for enhanced flexibility.
          </li>
          <li>
            <strong>Preview Option:</strong> Provides a preview of extracted data before
            downloading.
          </li>
          <li>
            <strong>Output Generation:</strong> Allows users to download extracted results in
            multiple formats, including .txt, .docx, and .pdf for broader accessibility.
          </li>
          <li>
            <strong>User-Friendly Interface:</strong> Interactive design with badges, dropdowns, and
            modals.
          </li>
        </ul>
      </div>

      <div className="about-section tutorial-video">
        <h3>Tutorial Video</h3>
        <p>Watch this video to learn how to use the application:</p>
        <video width="100%" height="auto" controls>
          <source src="/tutorialVideo.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </Container>
  );
};

export default AboutComponent;
