"""
This module contains the RESTful route handlers
for searching, previewing, and downloading files.
"""
import json
from flask import Blueprint, Response, request, make_response
from responses import ResponseSuccess
from usecases.search_orca_data import find_sections_use_case, preview_document_use_case
from utils.http_status_mapping import HTTP_STATUS_CODES_MAPPING

blueprint = Blueprint("search_orca_data", __name__)

@blueprint.route('/preview', methods=['POST'])
def preview_document():
    """
    API endpoint to preview the document.
    """
    data = request.get_json(force=True)
    response = preview_document_use_case(data)
    return Response(
        json.dumps(response.value),
        mimetype="application/json",
        status=HTTP_STATUS_CODES_MAPPING[response.response_type],
    )

@blueprint.route('/find-sections', methods=['POST'])
def find_sections():
    """
    API endpoint to find sections and download as Word document.
    """
    data = request.get_json(force=True)
    response = find_sections_use_case(data)

    if isinstance(response, ResponseSuccess):
        docx_content = response.value
        docx_response = make_response(docx_content)
        docx_response.headers.set(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        )
        docx_response.headers.set(
            'Content-Disposition',
            'attachment',
            filename='output.docx'
        )
        return docx_response

    # Handle ResponseFailure
    return Response(
        json.dumps(response.value),
        mimetype="application/json",
        status=HTTP_STATUS_CODES_MAPPING[response.response_type],
    )
