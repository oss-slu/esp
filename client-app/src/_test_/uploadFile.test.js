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
});