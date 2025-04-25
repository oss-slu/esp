from responses import ResponseSuccess, ResponseFailure, ResponseTypes
from docx import Document
from fpdf import FPDF
from services.file_search_operations import extract_sections, save_document_to_bytes
import os
import io


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
    provided search query and desired output format.
    '''
    file_paths = data.get('file_paths')
    search_terms = data.get('search_terms', [])
    sections = data.get('sections')
    temp_specify_lines = data.get('specify_lines')
    use_total_lines = data.get('use_total_lines', False)
    total_lines = data.get('total_lines', 2000)
    output_format = data.get('output_format', 'docx').lower()

    if not all([file_paths, search_terms, sections, temp_specify_lines]):
        return ResponseFailure(ResponseTypes.PARAMETER_ERROR, 'Missing required fields')

    try:
        sections = list(map(int, sections))
        specify_lines = [temp_specify_lines] * len(sections)

        combined_text = ""
        has_content = False
        for file_path in file_paths:
            file_name = os.path.basename(file_path)
            document_content = extract_sections(
                file_path, search_terms, sections,
                specify_lines, use_total_lines, total_lines
            )

            if document_content:
                has_content = True
                combined_text += f"===== File: {file_name} =====\n{document_content.strip()}\n\n"

        if not has_content:
            return ResponseFailure(ResponseTypes.NOT_FOUND, 'No data found for the provided search term.')

        if output_format == "txt":
            return ResponseSuccess(combined_text.encode("utf-8"))

        elif output_format == "pdf":
            pdf = FPDF()
            pdf.set_auto_page_break(auto=True, margin=10)
            pdf.add_page()
            pdf.set_font("Arial", size=12)
            for line in combined_text.splitlines():
                pdf.multi_cell(0, 10, line)
            pdf_bytes = pdf.output(dest='S').encode('latin1')
            return ResponseSuccess(pdf_bytes)

        else:
            document = Document()
            for block in combined_text.strip().split('\n'):
                document.add_paragraph(block.strip())
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