"""
This module contains the RESTful route handlers
for searching,previewing and downloading files.
"""
import os
import tempfile
import json
from flask import Blueprint, Response, request, make_response
from responses import ResponseTypes, ResponseSuccess, ResponseFailure
from usecases.search_orca_data import find_sections_use_case, preview_document_use_case
from docx2pdf import convert
import io

blueprint = Blueprint("search_orca_data", __name__)

HTTP_STATUS_CODES_MAPPING = {
    ResponseTypes.NOT_FOUND: 404,
    ResponseTypes.SYSTEM_ERROR: 500,
    ResponseTypes.AUTHORIZATION_ERROR: 403,
    ResponseTypes.PARAMETER_ERROR: 400,
    ResponseTypes.SUCCESS: 200,
    ResponseTypes.CONFLICT: 409
}

@blueprint.route('/preview', methods=['POST'])
def preview_document():
    '''
    This method defines the API endpoint to preview
    the document
    '''
    data = request.get_json(force=True)
    response = preview_document_use_case(data)
    return Response(
        json.dumps(response.value),
        mimetype="application/json",
        status=HTTP_STATUS_CODES_MAPPING[response.response_type],
    )


@blueprint.route('/find-sections', methods=['POST'])
def find_sections():
    data = request.get_json(force=True)
    response = find_sections_use_case(data)
    
    if isinstance(response, ResponseSuccess):
        format = data.get('format', 'docx')
        content = response.value
        
        if format == 'pdf':
            try:
                # Create temporary directory and files
                temp_dir = tempfile.mkdtemp()
                docx_path = os.path.join(temp_dir, 'temp.docx')
                pdf_path = os.path.join(temp_dir, 'temp.pdf')
                
                # Write DOCX content to temporary file
                with open(docx_path, 'wb') as f:
                    f.write(content)
                
                # Convert to PDF using file paths
                convert(docx_path, pdf_path)
                
                # Read the converted PDF
                with open(pdf_path, 'rb') as f:
                    content = f.read()
                
                mime_type = 'application/pdf'
                filename = 'output.pdf'
            finally:
                # Clean up temporary files
                if os.path.exists(docx_path):
                    os.remove(docx_path)
                if os.path.exists(pdf_path):
                    os.remove(pdf_path)
                os.rmdir(temp_dir)
        else:
            mime_type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            filename = 'output.docx'
            
        response = make_response(content)
        response.headers.set('Content-Type', mime_type)
        response.headers.set('Content-Disposition', 'attachment', filename=filename)
        return response
