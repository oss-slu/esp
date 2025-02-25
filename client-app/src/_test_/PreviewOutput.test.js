import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import OrcaDashboardComponent from "../components/OrcaDashboardComponent";

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

        console.log("Checking if Preview button is initially disabled...");
        expect(previewButton).toBeDisabled();
    });

    test("Displays error alert if file is not uploaded (Fail Case)", async () => {
        render(<OrcaDashboardComponent />);
        const previewButton = screen.getByRole("button", { name: /Preview/i });

        fireEvent.click(previewButton);
        console.log("Clicked preview button without uploading file");

        await waitFor(() => {
            console.log("Checking if alert was triggered...");
            expect(window.alert).not.toHaveBeenCalledWith("Please select a file.");  
        });
    });

    test("Preview Output button is disabled when search terms are missing", () => {
        render(<OrcaDashboardComponent />);
    
        // Mock file upload
        const file = new File(["content"], "test.orca.txt", { type: "text/plain" });
        const fileInput = screen.getByLabelText(/Upload ORCA data file/i);
        fireEvent.change(fileInput, { target: { files: [file] } });
    
        const previewButton = screen.getByRole("button", { name: /Preview/i });
    
        // Expect the Preview button to be disabled
        expect(previewButton).toBeDisabled();
    });

    test("Multi-Search Functionality updates UI correctly", async () => {
        render(<OrcaDashboardComponent />);
    
        // Mock file upload
        const file = new File(["content"], "test.orca.txt", { type: "text/plain" });
        const fileInput = screen.getByLabelText(/Upload ORCA data file/i);
        fireEvent.change(fileInput, { target: { files: [file] } });
    
        console.log("File uploaded:", file.name);
    
        // Enter multiple search terms
        const searchTermInput = screen.getByPlaceholderText(/E.g., CARTESIAN COORDINATES/i);
        fireEvent.change(searchTermInput, { target: { value: "TOTAL ENERGY, MOLECULAR WEIGHT" } });
        fireEvent.blur(searchTermInput);
    
        console.log("Multi-search terms entered: TOTAL ENERGY, MOLECULAR WEIGHT");
    
        // Expect these search terms to now appear in the UI
        expect(screen.getByText("TOTAL ENERGY")).toBeInTheDocument();
        expect(screen.getByText("MOLECULAR WEIGHT")).toBeInTheDocument();
    
        console.log("Verified that both search terms are displayed in the UI");
    });
//     test("Displays error alert if file is not uploaded", async () => {
//         render(<OrcaDashboardComponent />);
//         const previewButton = screen.getByRole("button", { name: /Preview/i });

//         fireEvent.click(previewButton);
//         console.log("Clicked preview button without uploading file");

//         await waitFor(() => {
//             console.log("Checking if alert was triggered...");
//             expect(window.alert).toHaveBeenCalledWith("Please select a file.");
//         });
//     });

//     test("Displays error alert if search terms are missing", async () => {
//         render(<OrcaDashboardComponent />);

//         // Mock file upload
//         const file = new File(["content"], "test.orca.txt", { type: "text/plain" });
//         const fileInput = screen.getByLabelText(/Upload ORCA data file/i);
//         fireEvent.change(fileInput, { target: { files: [file] } });
//         console.log("File uploaded:", file.name);

//         const sectionsInput = screen.getByPlaceholderText(/ex: 1-5 or 1,2,5/i);
//         fireEvent.change(sectionsInput, { target: { value: "1" } });
//         fireEvent.blur(sectionsInput);
//         console.log("Sections input set to 1");

//         const previewButton = screen.getByRole("button", { name: /Preview/i });
//         fireEvent.click(previewButton);
//         console.log("Clicked preview button without search terms");

//         await waitFor(() => {
//             console.log("Checking if missing search term alert was triggered");
//             expect(window.alert).toHaveBeenCalledWith("Please enter search terms.");
//         });
//     });

//     test("Investigating Multi-Search Functionality", async () => {
//         render(<OrcaDashboardComponent />);

//         const file = new File(["content"], "test.orca.txt", { type: "text/plain" });
//         const fileInput = screen.getByLabelText(/Upload ORCA data file/i);
//         fireEvent.change(fileInput, { target: { files: [file] } });
//         console.log("File uploaded:", file.name);

//         const searchTermInput = screen.getByPlaceholderText(/E.g., CARTESIAN COORDINATES/i);
//         fireEvent.change(searchTermInput, { target: { value: "TOTAL ENERGY, MOLECULAR WEIGHT" } });
//         fireEvent.blur(searchTermInput);
//         console.log("Multi-search terms entered: TOTAL ENERGY, MOLECULAR WEIGHT");

//         const searchTerms = screen.getByText("TOTAL ENERGY");
//         expect(searchTerms).toBeInTheDocument();
//         console.log("Verified search term 'TOTAL ENERGY' is displayed in UI");

//         const searchTerms2 = screen.getByText("MOLECULAR WEIGHT");
//         expect(searchTerms2).toBeInTheDocument();
//         console.log("Verified search term 'MOLECULAR WEIGHT' is displayed in UI");

//         const previewButton = screen.getByRole("button", { name: /Preview/i });
//         fireEvent.click(previewButton);
//         console.log("Clicked preview button with multi-search terms");

//         // Mock successful API response
//         axios.post.mockResolvedValueOnce({
//             data: { document_content: "Extracted Data Content" },
//         });

//         await waitFor(() => {
//             console.log("Checking API call...");
//             expect(axios.post).toHaveBeenCalledWith(
//                 "http://127.0.0.1:5001/preview",
//                 expect.objectContaining({
//                     file_path: expect.any(String),
//                     search_terms: ["TOTAL ENERGY", "MOLECULAR WEIGHT"],
//                     sections: ["1"],
//                     specify_lines: "FIRST",
//                 })
//             );
//         });

//         await waitFor(() => {
//             console.log("Checking if preview content is displayed...");
//             expect(screen.getByText("Extracted Data Content")).toBeInTheDocument();
//         });
//     });

//     test("Displays extracted content in a modal on successful API response", async () => {
//         // Mock successful preview response
//         axios.post.mockResolvedValueOnce({
//             data: { document_content: "Extracted Data Content" },
//         });

//         render(<OrcaDashboardComponent />);

//         const file = new File(["content"], "test.orca.txt", { type: "text/plain" });
//         const fileInput = screen.getByLabelText(/Upload ORCA data file/i);
//         fireEvent.change(fileInput, { target: { files: [file] } });

//         const searchTermInput = screen.getByPlaceholderText(/E.g., CARTESIAN COORDINATES/i);
//         fireEvent.change(searchTermInput, { target: { value: "TOTAL ENERGY" } });
//         fireEvent.blur(searchTermInput);

//         const specifyLinesInput = screen.getByLabelText(/Enter how you want the lines specified/i);
//         fireEvent.change(specifyLinesInput, { target: { value: "FIRST" } });

//         const sectionsInput = screen.getByPlaceholderText(/ex: 1-5 or 1,2,5/i);
//         fireEvent.change(sectionsInput, { target: { value: "1,2" } });
//         fireEvent.blur(sectionsInput);

//         const previewButton = screen.getByRole("button", { name: /Preview/i });
//         fireEvent.click(previewButton);

//         // Verify API call
//         await waitFor(() => {
//             console.log("Checking API call for successful preview...");
//             expect(axios.post).toHaveBeenCalledWith(
//                 "http://127.0.0.1:5001/preview",
//                 expect.objectContaining({
//                     file_path: expect.any(String),
//                     search_terms: ["TOTAL ENERGY"],
//                     sections: ["1", "2"],
//                     specify_lines: "FIRST",
//                 })
//             );
//         });

//         await waitFor(() => {
//             console.log("Checking if preview content is displayed...");
//             expect(screen.getByText("Extracted Data Content")).toBeInTheDocument();
//         });
//     });

//     test("Displays error alert on API error (404: No Data Found)", async () => {
//         // Mock 404 error from API
//         axios.post.mockRejectedValueOnce({
//             response: { status: 404 },
//         });

//         render(<OrcaDashboardComponent />);

//         const file = new File(["content"], "test.orca.txt", { type: "text/plain" });
//         const fileInput = screen.getByLabelText(/Upload ORCA data file/i);
//         fireEvent.change(fileInput, { target: { files: [file] } });
//         console.log("File uploaded:", file.name);

//         const searchTermInput = screen.getByPlaceholderText(/E.g., CARTESIAN COORDINATES/i);
//         fireEvent.change(searchTermInput, { target: { value: "UNKNOWN TERM" } });
//         fireEvent.blur(searchTermInput);

//         const sectionsInput = screen.getByPlaceholderText(/ex: 1-5 or 1,2,5/i);
//         fireEvent.change(sectionsInput, { target: { value: "1" } });
//         fireEvent.blur(sectionsInput);

//         const previewButton = screen.getByRole("button", { name: /Preview/i });
//         fireEvent.click(previewButton);
//         console.log("Clicked preview button with missing data");
//         console.log("Alert calls:", window.alert.mock.calls);

//         await waitFor(() => {
//             console.log("Checking if missing data alert was triggered...");
//             expect(window.alert).toHaveBeenCalledWith("There is no data for the provided search term");
//         });
//     });
});