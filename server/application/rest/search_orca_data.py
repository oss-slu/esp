"""
This module contains the RESTful route handlers
for searching, previewing, and downloading files.
"""
import json
from flask import Blueprint, Response, request, make_response
from responses import ResponseSuccess
from usecases.search_orca_data import find_sections_use_case, preview_document_use_case
from utils.http_status_mapping import HTTP_STATUS_CODES_MAPPING

# Define constants
CONTENT_TYPE = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
MIME_TYPE = 'application/json'
OUTPUT_FILENAME = 'output.document'

blueprint = Blueprint("search_orca_data", __name__)

def handle_response(response, mime_type=MIME_TYPE):
    """
    Utility function to handle JSON responses.
    """
    return Response(
        json.dumps(response.value),
        mimetype=mime_type,
        status=HTTP_STATUS_CODES_MAPPING[response.response_type],
    )

def handle_document_response(document_content):
    """
    Utility function to handle document responses.
    """
    document_response = make_response(document_content)
    document_response.headers.set('Content-Type', CONTENT_TYPE)
    document_response.headers.set('Content-Disposition', 'attachment', filename=OUTPUT_FILENAME)
    return document_response

@blueprint.route('/preview', methods=['POST'])
def preview_document():
    """
    API endpoint to preview the document.
    """
    data = request.get_json(force=True)
    response = preview_document_use_case(data)

    # Use the helper function to handle the response
    return handle_response(response)

@blueprint.route('/find-sections', methods=['POST'])
def find_sections():
    """
    API endpoint to find sections and download as Word document.
    """
    data = request.get_json(force=True)
    response = find_sections_use_case(data)

    if isinstance(response, ResponseSuccess):
        document_content = response.value
        # Use the helper function to handle document response
        return handle_document_response(document_content)

    # Handle failure response
    return handle_response(response)
