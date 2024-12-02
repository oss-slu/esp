import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UploadFile from '../UploadFile';  // Adjust the path if needed
import axios from 'axios';

// Mock axios to prevent actual HTTP requests
jest.mock('axios');

describe('UploadFile Component Tests', () => {
  beforeEach(() => {
    // Reset axios mocks before each test
    axios.post.mockClear();
  });

  test('renders UploadFile component', () => {
    render(<UploadFile />);
    expect(screen.getByText(/Upload File/i)).toBeInTheDocument();
  });

  test('displays error when no file is selected', () => {
    render(<UploadFile />);
    const uploadButton = screen.getByText(/Upload/i);
    fireEvent.click(uploadButton);
    expect(screen.getByText(/Please select a file to upload/i)).toBeInTheDocument();
  });

  test('handles file upload successfully', async () => {
    // Mock successful API response
    axios.post.mockResolvedValue({ data: { message: 'File uploaded successfully' } });

    render(<UploadFile />);
    const fileInput = screen.getByTestId('file-input'); // Ensure your file input has data-testid="file-input"
    const file = new File(['dummy content'], 'testfile.txt', { type: 'text/plain' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    const uploadButton = screen.getByText(/Upload/i);
    fireEvent.click(uploadButton);

    await waitFor(() => screen.getByText(/File uploaded successfully/i));
    expect(screen.getByText(/File uploaded successfully/i)).toBeInTheDocument();
  });

  test('handles file upload failure', async () => {
    // Mock failed API response
    axios.post.mockRejectedValue(new Error('Upload failed'));

    render(<UploadFile />);
    const fileInput = screen.getByTestId('file-input');
    const file = new File(['dummy content'], 'testfile.txt', { type: 'text/plain' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    const uploadButton = screen.getByText(/Upload/i);
    fireEvent.click(uploadButton);

    await waitFor(() => screen.getByText(/Upload failed/i));
    expect(screen.getByText(/Upload failed/i)).toBeInTheDocument();
  });
});
