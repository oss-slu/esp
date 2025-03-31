import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import OrcaDashboardComponent from "../components/OrcaDashboardComponent";

// Mock axios to avoid actual API calls
jest.mock("axios", () => ({
  post: jest.fn(),
}));

describe("OrcaDashboardComponent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  test("Clicking on Choose File and uploading an ORCA file", async () => {
    render(<OrcaDashboardComponent />);

    const file = new File(["content"], "test.orca.txt", { type: "text/plain" });
    const fileInput = screen.getByLabelText(/Upload ORCA data file/i);
    const uploadButton = screen.getByRole("button", { name: /Upload/i });

    // Mock axios post response
    const mockAxios = require("axios");
    mockAxios.post.mockResolvedValueOnce({ data: { file_name: "test.orca.txt" } });

    // Simulate file selection and upload
    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.click(uploadButton);

    // Assert file upload and display
    await waitFor(() => {
      expect(mockAxios.post).toHaveBeenCalledWith(
        "http://127.0.0.1:5001/upload",
        expect.any(FormData),
      );
    });

    await waitFor(() => {
      expect(screen.getByText("test.orca.txt")).toBeInTheDocument();
    });
  });

  test("Clicking on Choose File and try to upload any file other than the ORCA file", async () => {
    render(<OrcaDashboardComponent />);

    const file = new File(["content"], "test.pdf", { type: "application/pdf" });
    const fileInput = screen.getByLabelText(/Upload ORCA data file/i);
    const uploadButton = screen.getByRole("button", { name: /Upload/i });

    // Simulate file selection and upload
    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.click(uploadButton);

    // Expect alert to be called due to invalid file type
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Invalid file type. Please upload a .txt file.");
    });

    // Ensure that axios post was never called
    const mockAxios = require("axios");
    expect(mockAxios.post).not.toHaveBeenCalled();
  });

  /*
  test('Clicking on Preview without uploading any file and validating the error message', async () => {
    render(<OrcaDashboardComponent />);
  
    const previewButton = screen.getByRole('button', { name: /Submit Search Query/i });
  
    // Simulate clicking on Preview button
    fireEvent.click(previewButton);
  
    // Expect alert to be called due to no file selected
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Please select a file.');
    });
  });
  */

  test("Clicking on Download Output without uploading any file and validating the error message", async () => {
    const mockAxios = require("axios");
    mockAxios.post.mockResolvedValue({}); // Mock the API response

    render(<OrcaDashboardComponent />);
    
    const downloadButton = screen.getByRole("button", { name: /Please fill all required fields before submitting/i });
    
    // Ensure the button is disabled initially
    expect(downloadButton).toBeDisabled();

    // Ensure the button is not clickable
    fireEvent.click(downloadButton);
    expect(downloadButton).toBeDisabled(); // Button should still be disabled after click

    // Ensure axios.post was not called
    expect(mockAxios.post).not.toHaveBeenCalled();
  });

  //the unit test case to check the positive scenario -  'if the button is enabled after uploading the file and providing the search criteria' will be added as part of another issue
});
