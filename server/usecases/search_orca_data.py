from responses import ResponseSuccess, ResponseFailure, ResponseTypes
from docx import Document
from services.file_search_operations import extract_sections, save_document_to_bytes
import os


def preview_document_use_case(data):
    '''
    Prepares and returns a preview of the document content 
    based on the provided data.
    '''
    file_paths = data.get('file_paths')
    search_terms = data.get('search_terms', [])
    sections = data.get('sections')
    temp_specify_lines = data.get('specify_lines')
    use_total_lines = data.get('use_total_lines', False)
    total_lines = data.get('total_lines', 2000)

    if not all([file_paths, search_terms, sections, temp_specify_lines]):
        return ResponseFailure(ResponseTypes.PARAMETER_ERROR, 'Missing required fields')

    try:
        sections = list(map(int, sections))
        specify_lines = [temp_specify_lines] * len(sections)

        combined_content = ""
        has_content = False
        for file_path in file_paths:
            file_name = os.path.basename(file_path)
            document_content = extract_sections(file_path, search_terms, sections,
                                        specify_lines, use_total_lines, total_lines)
            if document_content:
                has_content = True
                combined_content += f"\n===== File name: {file_name} =====\n{document_content}\n"

        if not has_content:
            return ResponseFailure(ResponseTypes.NOT_FOUND, 'No data found for the provided search term.')

        return ResponseSuccess({'document_content': combined_content})
    
    except FileNotFoundError as e:
        return ResponseFailure(ResponseTypes.PARAMETER_ERROR, f'File not found: {str(e)}')
    except PermissionError as e:
        return ResponseFailure(ResponseTypes.PARAMETER_ERROR, f'Permission denied: {str(e)}')
    except ValueError as e:
        return ResponseFailure(ResponseTypes.PARAMETER_ERROR, f'Value error: {str(e)}')


def find_sections_use_case(data):
    '''
    Finds and returns a document with the specified data based on the 
    provided search query.
    '''
    file_paths = data.get('file_paths')
    search_terms = data.get('search_terms', [])
    sections = data.get('sections')
    temp_specify_lines = data.get('specify_lines')
    use_total_lines = data.get('use_total_lines', False)
    total_lines = data.get('total_lines', 2000)

    if not all([file_paths, search_terms, sections, temp_specify_lines]):
        return ResponseFailure(ResponseTypes.PARAMETER_ERROR, 'Missing required fields')

    try:
        sections = list(map(int, sections))
        specify_lines = [temp_specify_lines] * len(sections)

        document = Document()
        has_content = False
        for file_path in file_paths:
            file_name = os.path.basename(file_path)
            document_content = extract_sections(
                file_path, search_terms, sections,
                specify_lines, use_total_lines, total_lines
            )

            if document_content:
                has_content = True
                document.add_paragraph(f"===== File: {file_name} =====").bold = True
                for paragraph in document_content.strip().split('\n'):
                    document.add_paragraph(paragraph.strip())
        
        if not has_content:
            return ResponseFailure(ResponseTypes.NOT_FOUND, 'No data found for the provided search term.')     
        docx_bytes = save_document_to_bytes(document)
        return ResponseSuccess(docx_bytes)
    except FileNotFoundError as e:
        return ResponseFailure(ResponseTypes.PARAMETER_ERROR, f'File not found: {str(e)}')
    except PermissionError as e:
        return ResponseFailure(ResponseTypes.PARAMETER_ERROR, f'Permission denied: {str(e)}')
    except ValueError as e:
        return ResponseFailure(ResponseTypes.PARAMETER_ERROR, f'Value error: {str(e)}')
    except AttributeError as e:
        return ResponseFailure(ResponseTypes.SYSTEM_ERROR, f'Document processing error: {str(e)}')
    except TypeError as e:
        return ResponseFailure(ResponseTypes.SYSTEM_ERROR, f'Document type error: {str(e)}')
