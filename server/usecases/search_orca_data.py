"""
This module provides use cases for searching and processing 
data in ORCA log files, including functions for previewing document 
content and finding specific sections based on search terms.
"""

from responses import ResponseSuccess, ResponseFailure, ResponseTypes
from docx import Document
from services.file_search_operations import ORCALogExtractor, save_document_to_bytes


def preview_document_use_case(data):
    """
    Prepares and returns a preview of the document content 
    based on the provided data.
    """
    file_path = data.get('file_path')
    search_terms = data.get('search_terms')
    sections = data.get('sections')
    temp_specify_lines = data.get('specify_lines')

    if not all([file_path, search_terms, sections, temp_specify_lines]):
        return ResponseFailure(ResponseTypes.PARAMETER_ERROR, 'Missing required fields')

    try:
        sections = list(map(int, sections))
        specify_lines = [temp_specify_lines] * len(sections)

        # Use ORCALogExtractor for extraction
        extractor = ORCALogExtractor(file_path)
        document_content = extractor.extract_sections(
            search_terms=search_terms,
            sections=sections,
            specify_lines=specify_lines,
        )
        return ResponseSuccess({'document_content': document_content})
    except FileNotFoundError as e:
        return ResponseFailure(ResponseTypes.PARAMETER_ERROR, f'File not found: {str(e)}')
    except PermissionError as e:
        return ResponseFailure(ResponseTypes.PARAMETER_ERROR, f'Permission denied: {str(e)}')
    except ValueError as e:
        return ResponseFailure(ResponseTypes.PARAMETER_ERROR, f'Value error: {str(e)}')


def find_sections_use_case(data):
    """
    Finds and returns a document with the specified data based on the 
    provided search query.
    """
    file_path = data.get('file_path')
    search_terms = data.get('search_terms')
    sections = data.get('sections')
    temp_specify_lines = data.get('specify_lines')
    if not all([file_path, search_terms, sections, temp_specify_lines]):
        return ResponseFailure(ResponseTypes.PARAMETER_ERROR, 'Missing required fields')

    try:
        sections = list(map(int, sections))
        specify_lines = [temp_specify_lines] * len(sections)

        # Use ORCALogExtractor for extraction
        extractor = ORCALogExtractor(file_path)
        document_content = extractor.extract_sections(
            search_terms=search_terms,
            sections=sections,
            specify_lines=specify_lines,
        )

        # Create a Word document from the extracted content
        document = Document()
        for paragraph in document_content.split('\n'):
            document.add_paragraph(paragraph.strip())
        docx_bytes = save_document_to_bytes(document)
        result = ResponseSuccess(docx_bytes)
    except (FileNotFoundError, PermissionError, ValueError) as e:
        result = ResponseFailure(ResponseTypes.PARAMETER_ERROR, str(e))
    except (AttributeError, TypeError) as e:
        result = ResponseFailure(ResponseTypes.SYSTEM_ERROR, str(e))

    return result
