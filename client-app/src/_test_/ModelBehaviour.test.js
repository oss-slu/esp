import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import OrcaDashboardComponent from "../components/OrcaDashboardComponent";


jest.mock("axios", () => ({
  post: jest.fn(),
}));

describe("OrcaDashboardComponent - Modal Behavior", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  
  test("Pressing Escape key closes the modal", async () => {
    render(<OrcaDashboardComponent />);

    // Mock the API call
    const mockAxios = require("axios");
    mockAxios.post.mockResolvedValueOnce({
      data: { document_content: "Preview content for testing." },
    });

    const previewButton = screen.getByRole("button", { name: /Preview Output/i });
    fireEvent.click(previewButton);

    await waitFor(() => {
      fireEvent.keyDown(document, { key: "Escape" });
      expect(screen.queryByText("Document Preview")).not.toBeInTheDocument();
    });
  }); 
  
})