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
    based on the search input and to download the output in
    .docx, .pdf, or .txt format
    '''
    data = request.get_json(force=True)
    output_format = data.get("output_format", "docx").lower()

    response = find_sections_use_case(data)
    if isinstance(response, ResponseSuccess):
        content = response.value

        if output_format == "pdf":
            mimetype = "application/pdf"
            filename = "output.pdf"
        elif output_format == "txt":
            mimetype = "text/plain"
            filename = "output.txt"
        else:
            mimetype = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            filename = "output.docx"

        response = make_response(content)
        response.headers.set("Content-Type", mimetype)
        response.headers.set("Content-Disposition", "attachment", filename=filename)
        return response

    elif isinstance(response, ResponseFailure):
        return Response(
            json.dumps(response.value),
            mimetype="application/json",
            status=HTTP_STATUS_CODES_MAPPING[response.response_type],
        )

