from responses import ResponseSuccess, ResponseFailure, ResponseTypes
from docx import Document
from services.file_search_operations import ORCALogProcessor, save_document_to_bytes

def preview_document_use_case(data):
    '''
    Prepares and returns a preview of the document content 
    based on the provided data.
    '''
    file_path = data.get('file_path')
    search_terms = data.get('search_terms')
    sections = data.get('sections')
    temp_specify_lines = data.get('specify_lines')
    use_total_lines = data.get('use_total_lines', False)
    total_lines = data.get('total_lines', 2000)

    if not all([file_path, search_terms, sections, temp_specify_lines]):
        return ResponseFailure(ResponseTypes.PARAMETER_ERROR, 'Missing required fields')

    try:
        processor = ORCALogProcessor()
        sections = list(map(int, sections))
        specify_lines = [temp_specify_lines] * len(sections)
        document_content = processor.extract_sections(
            file_path, search_terms, sections, specify_lines, 
            use_total_lines, total_lines
        )
        return ResponseSuccess({'document_content': document_content})
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
    file_path = data.get('file_path')
    search_terms = data.get('search_terms')
    sections = data.get('sections')
    temp_specify_lines = data.get('specify_lines')
    use_total_lines = data.get('use_total_lines', False)
    total_lines = data.get('total_lines', 2000)

    if not all([file_path, search_terms, sections, temp_specify_lines]):
        return ResponseFailure(ResponseTypes.PARAMETER_ERROR, 'Missing required fields')

    try:
        processor = ORCALogProcessor()
        sections = list(map(int, sections))
        specify_lines = [temp_specify_lines] * len(sections)
        document_content = processor.extract_sections(
            file_path, search_terms, sections, specify_lines, 
            use_total_lines, total_lines
        )
        document = Document()
        for paragraph in document_content.split('\n'):
            document.add_paragraph(paragraph.strip())
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
