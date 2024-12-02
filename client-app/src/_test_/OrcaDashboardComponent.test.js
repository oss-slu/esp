import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrcaDashboardComponent from '../components/OrcaDashboardComponent';

// Mock axios and file-saver
jest.mock('axios');
jest.mock('file-saver');

describe('OrcaDashboardComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders format selection buttons', () => {
    render(<OrcaDashboardComponent />);
    expect(screen.getByText('DOCX')).toBeInTheDocument();
    expect(screen.getByText('PDF')).toBeInTheDocument();
  });

  test('switches format when clicking format buttons', () => {
    render(<OrcaDashboardComponent />);
    const pdfButton = screen.getByText('PDF');
    const docxButton = screen.getByText('DOCX');

    // Initially DOCX should be selected
    expect(docxButton).toHaveClass('btn-primary');
    expect(pdfButton).toHaveClass('btn-outline-primary');

    // Click PDF button
    fireEvent.click(pdfButton);
    expect(pdfButton).toHaveClass('btn-primary');
    expect(docxButton).toHaveClass('btn-outline-primary');
  });

  test('disables download button when no file is selected', () => {
    render(<OrcaDashboardComponent />);
    const downloadButton = screen.getByText('Download Output');
    expect(downloadButton).toBeDisabled();
  });
});