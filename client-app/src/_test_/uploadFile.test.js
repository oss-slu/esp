import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DraftOrcaDashboard from '../components/DraftOrcaDashboard';

jest.mock('axios');

describe('DraftOrcaDashboard', () => {
  // Test for successful file upload of an ORCA file
  test('should allow uploading an ORCA file', async () => {
    render(<DraftOrcaDashboard />);

    // Simulate clicking the "Choose File" button
    const fileInput = screen.getByLabelText('Upload your ORCA data file');
    fireEvent.click(fileInput);

    // Simulate selecting an ORCA file
    const mockFile = new File([''], 'orcaFile.orca', { type: 'text/plain' }); 
    fileInput.files = [mockFile];
    fireEvent.change(fileInput);

    // Simulate clicking the "Upload" button
    const uploadButton = screen.getByText('Upload');
    fireEvent.click(uploadButton);

    // Assert that the filename is displayed after successful upload
    await waitFor(() => {
      expect(screen.getByText('orcaFile.orca')).toBeInTheDocument();
    });
  });

  // Test for preventing non-ORCA file upload
  test('should prevent uploading non-ORCA files', async () => {
    render(<DraftOrcaDashboard />);

    // Simulate clicking the "Choose File" button
    const fileInput = screen.getByLabelText('Upload your ORCA data file');
    fireEvent.click(fileInput);

    // Simulate selecting a non-ORCA file
    const mockFile = new File([''], 'invalidFile.txt', { type: 'text/plain' });
    fileInput.files = [mockFile];
    fireEvent.change(fileInput);

    // Simulate clicking the "Upload" button
    const uploadButton = screen.getByText('Upload');
    fireEvent.click(uploadButton);

    // Assert that an error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Only ORCA files are allowed')).toBeInTheDocument();
    });
  });


});