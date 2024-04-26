import React from 'react';
import { Container } from 'react-bootstrap';
import "../styles/AboutComponent.css"

const AboutComponent = () => {
  return (
    <Container className="d-flex justify-content-center mb-4">
      <div className="text-left mb-3 min-vh-100">
        <h2 className="mb-4">About</h2>
        <p className="about-content">
          Our web application specializes in extracting specific details from chemistry log files. Users can
          effortlessly search for information by entering a search term, enabling efficient data retrieval.
          Additionally, our application offers the convenience of downloading the extracted data as a Word document,
          ensuring seamless accessibility and usability.
        </p>
      </div>
    </Container>
  );
};

export default AboutComponent;