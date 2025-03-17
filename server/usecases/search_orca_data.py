from responses import ResponseSuccess, ResponseFailure, ResponseTypes
from docx import Document
from services.file_search_operations import extract_sections, save_document_to_bytes
import os

def preview_document_use_case(data):
    '''
    Prepares and returns a preview of the document content 
    based on the provided data.
    '''
    file_paths = data.get('file_paths', [])
    search_terms = data.get('search_terms', [])
    sections = data.get('sections', [])
    temp_specify_lines = data.get('specify_lines')
    use_total_lines = data.get('use_total_lines', False)
    total_lines = data.get('total_lines', 2000)

    print("DEBUG: Received preview request with data:", data)
    print("DEBUG: Extracted file_paths:", file_paths)

    if not all([file_paths, search_terms, sections, temp_specify_lines]):
        print("ERROR: Missing required fields")
        return ResponseFailure(ResponseTypes.PARAMETER_ERROR, 'Missing required fields')

    preview_results = {}

    try:
        sections = list(map(int, sections))
        specify_lines = [temp_specify_lines] * len(sections)
        
        for file_path in file_paths:
            print(f"DEBUG: Checking file - {file_path}, Type: {type(file_path)}")

            if not os.path.exists(file_path):
                print(f"ERROR: File does not exist - {file_path}")
                return ResponseFailure(ResponseTypes.PARAMETER_ERROR, f'File not found: {file_path}')
            
            print(f"DEBUG: Checking os.access for {file_path}, Exists: {os.path.exists(file_path)}")
            if not os.access(file_path, os.R_OK):
                print(f"ERROR: Permission denied for file - {file_path}")
                return ResponseFailure(ResponseTypes.PARAMETER_ERROR, f'Permission denied: {file_path}')

            document_content = extract_sections(file_path, search_terms, sections, 
                                            specify_lines, use_total_lines, total_lines)

            if not document_content:
                print(f"WARNING: No matching data found in {file_path}")
                preview_results[file_path] = "No matching data found."
            else:
                preview_results[file_path] = document_content
                
        return ResponseSuccess({"preview_results": preview_results})
        
    except Exception as e:
        print(f"CRITICAL ERROR: {str(e)}")
        return ResponseFailure(ResponseTypes.SYSTEM_ERROR, f'Error processing review: {str(e)}')
        
    except FileNotFoundError as e:
        print(f"ERROR: File not found: {e}")
        return ResponseFailure(ResponseTypes.PARAMETER_ERROR, f'File not found: {str(e)}')
    
    except PermissionError as e:
        print(f"ERROR: Permission denied: {e}")
        return ResponseFailure(ResponseTypes.PARAMETER_ERROR, f'Permission denied: {str(e)}')
    
    except ValueError as e:
        print(f"ERROR: Value error: {e}")
        return ResponseFailure(ResponseTypes.PARAMETER_ERROR, f'Value error: {str(e)}')
    
    except AttributeError as e:
        print(f"ERROR: Document processing error: {e}")
        return ResponseFailure(ResponseTypes.SYSTEM_ERROR, f'Document processing error: {str(e)}')

    except TypeError as e:
        print(f"ERROR: Document type error: {e}")
        return ResponseFailure(ResponseTypes.SYSTEM_ERROR, f'Document type error: {str(e)}')


def find_sections_use_case(data):
    '''
    Finds and returns a document with the specified data based on the 
    provided search query.
    '''
    file_paths = data.get('file_paths', [])
    search_terms = data.get('search_terms', [])
    sections = data.get('sections', [])
    pecify_lines = data.get('specify_lines')
    use_total_lines = data.get('use_total_lines', False)
    total_lines = data.get('total_lines', 2000)

    if not all([file_paths, search_terms, sections, specify_lines]):
        return ResponseFailure(ResponseTypes.PARAMETER_ERROR, 'Missing required fields')

    try:
        sections = list(map(int, sections))
        specify_lines = [specify_lines] * len(sections)

        document = Document()

        for file_path in file_paths:
            document.add_paragraph(f"Results from {file_path}:")
            document_content = extract_sections(file_path, search_terms, sections, 
                                            specify_lines, use_total_lines, total_lines)
            
            if document_content:
                for paragraph in document_content.split("\n"):
                    document.add_paragraph(paragraph.strip())
            else:
                document.add_paragraph("No Matching Data Found.")
            
            document.add_paragraph("\n" + "-" * 50 + "\n")

        docx_bytes = save_document_to_bytes(document)
        return ResponseSuccess(docx_bytes)
    
    except Exception as e:
        return ResponseFailure(ResponseTypes.SYSTEM_ERROR, f'Error generating document: {str(e)}')
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
