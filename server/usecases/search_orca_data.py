"""
This module provides use cases for searching and processing 
data in ORCA log files, including functions for previewing document 
content and finding specific sections based on search terms.
"""

from docx import Document
from responses import ResponseSuccess, ResponseFailure, ResponseTypes
from services.file_search_operations import (
    ORCALogExtractor,
    save_document_to_bytes,
    ExtractionConfig,
)


def preview_document_use_case(data):
    """
    Prepares and returns a preview of the document content based 
    on the provided data.
    """
    file_path = data.get("file_path")
    search_terms = data.get("search_terms")
    sections = data.get("sections")
    temp_specify_lines = data.get("specify_lines")
    use_total_lines = data.get("use_total_lines", False)  # Default to False
    total_lines = data.get("total_lines", None)  # Default to None (no limit)

    if not all([file_path, search_terms, sections, temp_specify_lines]):
        return ResponseFailure(ResponseTypes.PARAMETER_ERROR, "Missing required fields")

    try:
        sections = list(map(int, sections))
        specify_lines = [temp_specify_lines] * len(sections)

        # Use ORCALogExtractor for extraction
        config = ExtractionConfig(use_total_lines=use_total_lines, total_lines=total_lines)
        extractor = ORCALogExtractor(file_path)
        document_content = extractor.extract_sections(
            search_terms=search_terms,
            sections=sections,
            specify_lines=specify_lines,
            config=config
        )
        return ResponseSuccess({"document_content": document_content})
    except (FileNotFoundError, PermissionError, ValueError) as error:
        return ResponseFailure(ResponseTypes.PARAMETER_ERROR, str(error))
    except (AttributeError, TypeError) as error:
        return ResponseFailure(ResponseTypes.SYSTEM_ERROR, str(error))

def find_sections_use_case(data):
    """
    Finds and returns a document with the specified data based on the provided search query.
    """
    file_path = data.get("file_path")
    search_terms = data.get("search_terms")
    sections = data.get("sections")
    temp_specify_lines = data.get("specify_lines")
    use_total_lines = data.get("use_total_lines", False)  # Default to False
    total_lines = data.get("total_lines", None)  # Default to None (no limit)

    if not all([file_path, search_terms, sections, temp_specify_lines]):
        return ResponseFailure(ResponseTypes.PARAMETER_ERROR, "Missing required fields")

    try:
        sections = list(map(int, sections))
        specify_lines = [temp_specify_lines] * len(sections)

        # Use ORCALogExtractor for extraction
        config = ExtractionConfig(use_total_lines=use_total_lines, total_lines=total_lines)
        extractor = ORCALogExtractor(file_path)
        document_content = extractor.extract_sections(
            search_terms=search_terms,
            sections=sections,
            specify_lines=specify_lines,
            config=config
        )

        # Create a Word document from the extracted content
        document = Document()
        for paragraph in document_content.split("\n"):
            document.add_paragraph(paragraph.strip())
        docx_bytes = save_document_to_bytes(document)
        return ResponseSuccess(docx_bytes)
    except (FileNotFoundError, PermissionError, ValueError) as error:
        return ResponseFailure(ResponseTypes.PARAMETER_ERROR, str(error))
    except (AttributeError, TypeError) as error:
        return ResponseFailure(ResponseTypes.SYSTEM_ERROR, str(error))
