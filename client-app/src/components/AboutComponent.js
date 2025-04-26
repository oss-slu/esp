import React from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import "../styles/AboutComponent.css";

const AboutComponent = () => {
  const now = new Date();
  const showBadges = now < new Date("2025-08-01");

  return (
    <Container className="py-5 min-vh-100">
      <Row className="justify-content-center mb-4">
        <Col md={10} lg={8}>
          <h2 className="text-center mb-3">Electronic Structure Parser</h2>
          <p className="text-center text-muted">
            Simplify chemistry log file analysis and easily export your data to Word documents.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm mb-2 h-100">
            <Card.Body className="pb-2">
              <Card.Title>Features</Card.Title>
              <div className="feature-list">
                <div className="feature-item">
                  <span>🧪 Upload ORCA & Gaussian logs</span>
                  {showBadges && (
                    <Badge bg="warning" className="highlight-badge fixed-width-badge align-middle small-badge">
                      ✨ Multi-file upload supported! ✨
                    </Badge>
                  )}
                </div>
                <div className="feature-item">
                  <span>🔍 Precise keyword search</span>
                  {showBadges && (
                    <Badge bg="warning" className="highlight-badge fixed-width-badge align-middle small-badge">
                      ✨ Multi-term search supported! ✨
                    </Badge>
                  )}
                </div>
                <div className="feature-item">
                  <span>📊 Section-specific data extraction</span>
                </div>
                <div className="feature-item">
                  <span>👁️ Preview data before downloading</span>
                </div>
                <div className="feature-item">
                  <span>📄 Export results in specified format</span>
                  {showBadges && (
                    <Badge bg="warning" className="highlight-badge fixed-width-badge align-middle small-badge">
                      ✨ Now supports .docx, .txt, and .pdf! ✨
                    </Badge>
                  )}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm mb-2 h-100">
            <Card.Body className="pb-2">
              <Card.Title>How it Works</Card.Title>
              <ol className="feature-list list-unstyled" style={{ lineHeight: "1.2", paddingLeft: "0.2rem" }}>
                <li><strong>1.</strong> Upload your log files – <span className="text-muted small">Upload supported files from your system.</span></li>
                <li><strong>2.</strong> Enter your search terms – <span className="text-muted small">Input keywords to locate data.</span></li>
                <li><strong>3.</strong> Specify your line selections – <span className="text-muted small">Choose first, last, or all lines.</span></li>
                <li><strong>4.</strong> Select sections to search – <span className="text-muted small">Target specific file sections.</span></li>
                <li><strong>5.</strong> Preview and verify results – <span className="text-muted small">Review the data before export.</span></li>
                <li><strong>6.</strong> Download as a Word document – <span className="text-muted small">Export data as a .docx file.</span></li>
              </ol>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center mb-5 mt-5">
        <Col md={10} lg={8} className="text-center">
          <h4 className="mb-4">Quick Demo</h4>
          <video width="100%" controls className="shadow-sm">
            <source src="/tutorialVideo.mov" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col className="text-center text-muted small">
          <p>
            Built for simplicity, efficiency, and accuracy in electronic structure analysis.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutComponent;
