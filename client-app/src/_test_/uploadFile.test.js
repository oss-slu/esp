import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import DraftOrcaDashboard from '../components/DraftOrcaDashboard';

// Mock axios to avoid actual API calls
jest.mock('axios', () => ({
  post: jest.fn(),
}));

describe('DraftOrcaDashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  test('Clicking on Choose File and uploading an ORCA file', async () => {
    render(<DraftOrcaDashboard />);

    const file = new File(['content'], 'test.orca.txt', { type: 'text/plain' });
    const fileInput = screen.getByLabelText(/Upload ORCA data file/i);
    const uploadButton = screen.getByRole('button', { name: /Upload/i });

    // Mock axios post response
    const mockAxios = require('axios');
    mockAxios.post.mockResolvedValueOnce({ data: { filename: 'test.orca.txt' } });

    // Simulate file selection and upload
    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.click(uploadButton);

    // Assert file upload and display
    await waitFor(() => {
      expect(mockAxios.post).toHaveBeenCalledWith(
        'http://localhost:5001/upload',
        expect.any(FormData)
      );
      expect(screen.getByText('test.orca.txt')).toBeInTheDocument();
    });
  });

  test('Clicking on Choose File and try to upload any file other than the ORCA file', async () => {
    render(<DraftOrcaDashboard />);

    const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
    const fileInput = screen.getByLabelText(/Upload ORCA data file/i);
    const uploadButton = screen.getByRole('button', { name: /Upload/i });

    // Simulate file selection and upload
    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.click(uploadButton);

    // Expect alert to be called due to invalid file type
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Invalid file type. Please upload a .txt file.');
    });

    // Ensure that axios post was never called
    const mockAxios = require('axios');
    expect(mockAxios.post).not.toHaveBeenCalled();
  });

  test('Clicking on Preview without uploading any file and validating the error message', async () => {
    render(<DraftOrcaDashboard />);
  
    const previewButton = screen.getByRole('button', { name: /Submit Search Query/i });
  
    // Simulate clicking on Preview button
    fireEvent.click(previewButton);
  
    // Expect alert to be called due to no file selected
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Please select a file.');
    });
  });

});
