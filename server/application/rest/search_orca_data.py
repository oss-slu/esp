"""
This module contains the RESTful route handlers
for searching,previewing and downloading files.
"""
import json
from flask import Blueprint, Response, request, make_response
from responses import ResponseTypes, ResponseSuccess, ResponseFailure
from usecases.search_orca_data import find_sections_use_case, preview_document_use_case


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

    # Debugging logs
    print("DEBUG: Received request in Flask preview endpoint.")
    print("DEBUG: Full received JSON data:", json.dumps(data, indent=4))

    file_paths = data.get("file_paths", [])
    print("DEBUG: Extracted file_paths before validation:", file_paths)
    
    if not isinstance(file_paths, list) or not file_paths:
        print("ERROR: Invalid or missing file_paths. Received:", file_paths)
        return Response(
            json.dumps({"error": "Invalid or missing file_paths"}),
            mimetype="application/json",
            status=400
        )

    response = preview_document_use_case(data)

    return Response(
        json.dumps(response.value),
        mimetype="application/json",
        status=HTTP_STATUS_CODES_MAPPING[response.response_type],
    )

@blueprint.route('/find-sections', methods=['POST'])
def find_sections():
    '''
    This method defines the API endpoint to find the sections
    based on the search input and to download the output as
    word document
    '''
    data = request.get_json(force=True)

    # Debugging logs
    print("DEBUG: Received request in Flask find-sections endpoint.")
    print("DEBUG: Full received JSON data:", json.dumps(data, indent=4))

    file_paths = data.get("file_paths", [])
    print("DEBUG: Extracted file_paths before validation:", file_paths)

    if not isinstance(file_paths, list) or not file_paths:
        return Response(
            json.dumps({"error": "Invalid or missing file_paths"}),
            mimetype="application/json",
            status=400
        )

    response = find_sections_use_case(data)

    if isinstance(response, ResponseSuccess):
        docx_content = response.value
        response = make_response(docx_content)
        response.headers.set('Content-Type',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        response.headers.set('Content-Disposition', 'attachment', filename='output.docx')
        return response
    elif isinstance(response, ResponseFailure):
        return Response(
            json.dumps(response.value),
            mimetype="application/json",
            status=HTTP_STATUS_CODES_MAPPING[response.response_type],
        )
