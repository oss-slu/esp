import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import OrcaDashboardComponent from "../components/OrcaDashboardComponent";
//import axios from "axios";

// Mock axios to avoid actual API calls
jest.mock("axios", () => ({
    post: jest.fn(),
  }));

describe("Preview Output Functionality", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(window, "alert").mockImplementation(() => {});
        jest.spyOn(console, "error").mockImplementation(() => {});
    });

    test("Preview Output button is disabled when inputs are incomplete", () => {
        render(<OrcaDashboardComponent />);
        const previewButton = screen.getByRole("button", { name: /Preview/i });

        // Initially disabled without inputs
        expect(previewButton).toBeDisabled();
    });

    test("Displays error alert if file is not uploaded", async () => {
        render(<OrcaDashboardComponent />);
        const previewButton = screen.getByRole("button", { name: /Preview/i });

        // Click preview without uploading a file
        fireEvent.click(previewButton);

        // Expect an alert for missing file
        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith("Please select a file.");
        });
    });

    test("Displays error alert if search terms are missing", async () => {
        render(<OrcaDashboardComponent />);

        // Mock file upload
        const file = new File(["content"], "test.orca.txt", { type: "text/plain" });
        const fileInput = screen.getByLabelText(/Upload ORCA data file/i);
        fireEvent.change(fileInput, { target: { files: [file] } });

        const sectionsInput = screen.getByPlaceholderText(/ex: 1-5 or 1,2,5/i);
        fireEvent.change(sectionsInput, { target: { value: "1" } });
        fireEvent.blur(sectionsInput);

        const previewButton = screen.getByRole("button", { name: /Preview/i });

        // Click preview without entering search terms
        fireEvent.click(previewButton);

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith("Please enter search terms.");
        });
    });

    test("Displays extracted content in a modal on successful API response", async () => {
        // Mock successful preview response
        const mockAxios = require("axios");
        mockAxios.post.mockResolvedValueOnce({
            data: { document_content: "Extracted Data Content" },
        });

        render(<OrcaDashboardComponent />);

        // Mock file upload
        const file = new File(["content"], "test.orca.txt", { type: "text/plain" });
        const fileInput = screen.getByLabelText(/Upload ORCA data file/i);
        fireEvent.change(fileInput, { target: { files: [file] } });

        // Enter search terms
        const searchTermInput = screen.getByPlaceholderText(/E.g., CARTESIAN COORDINATES/i);
        fireEvent.change(searchTermInput, { target: { value: "TOTAL ENERGY" } });
        fireEvent.blur(searchTermInput);

        // Enter line specification
        const specifyLinesInput = screen.getByLabelText(/Enter how you want the lines specified/i);
        fireEvent.change(specifyLinesInput, { target: { value: "FIRST" } });
        //fireEvent.blur(specifyLinesInput);

        // Enter section numbers
        const sectionsInput = screen.getByPlaceholderText(/ex: 1-5 or 1,2,5/i);
        fireEvent.change(sectionsInput, { target: { value: "1,2" } });
        fireEvent.blur(sectionsInput);

        const previewButton = screen.getByRole("button", { name: /Preview/i });
        fireEvent.click(previewButton);

        // Verify API call
        await waitFor(() => {
            expect(mockAxios.post).toHaveBeenCalledWith(
                "http://127.0.0.1:5001/preview",
                expect.objectContaining({
                    file_path: expect.any(String),
                    search_terms: ["TOTAL ENERGY"],
                    sections: ["1", "2"],
                    specify_lines: "FIRST",
                })
            );
        });

        // Verify content display
        await waitFor(() => {
            expect(screen.getByText("Extracted Data Content")).toBeInTheDocument();
        });
    });

    test("Displays error alert on API error (404: No Data Found)", async () => {
        // Mock 404 error from API
        const mockAxios = require("axios");
        mockAxios.post.mockRejectedValueOnce({
            response: {status: 404 },
        });

        render(<OrcaDashboardComponent />);

        // Mock file upload
        const file = new File(["content"], "test.orca.txt", { type: "text/plain" });
        const fileInput = screen.getByLabelText(/Upload ORCA data file/i);
        fireEvent.change(fileInput, { target: { files: [file] } });

        // Enter search terms
        const searchTermInput = screen.getByPlaceholderText(/E.g., CARTESIAN COORDINATES/i);
        fireEvent.change(searchTermInput, { target: { value: "UNKNOWN TERM" } });
        fireEvent.blur(searchTermInput);

        // Enter section numbers
        const sectionsInput = screen.getByPlaceholderText(/ex: 1-5 or 1,2,5/i);
        fireEvent.change(sectionsInput, { target: { value: "1" } });
        fireEvent.blur(sectionsInput);

        const previewButton = screen.getByRole("button", { name: /Preview/i });
        fireEvent.click(previewButton);

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith("There is no data for the provided search term");
        });
    });
});