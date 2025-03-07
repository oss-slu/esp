"""
This module contains the RESTful route handlers
for uploading files.
"""
import json
from flask import Blueprint, Response, request, jsonify
from flask_cors import cross_origin
from responses import ResponseTypes
from usecases.upload_files import file_upload_use_case, get_data_use_case

blueprint = Blueprint("upload_files", __name__)

HTTP_STATUS_CODES_MAPPING = {
    ResponseTypes.NOT_FOUND: 404,
    ResponseTypes.SYSTEM_ERROR: 500,
    ResponseTypes.AUTHORIZATION_ERROR: 403,
    ResponseTypes.PARAMETER_ERROR: 400,
    ResponseTypes.SUCCESS: 200,
    ResponseTypes.CONFLICT: 409
}

@blueprint.route('/upload', methods=['POST'])
@cross_origin()
def file_upload():
    if 'file' not in request.files:
        return Response(
            json.dumps({'message': 'No file part'}),
            mimetype="application/json",
            status=HTTP_STATUS_CODES_MAPPING[ResponseTypes.PARAMETER_ERROR],
        )
    files = request.files.getlist('file')
    all_responses = []
    final_status_code = HTTP_STATUS_CODES_MAPPING[ResponseTypes.SUCCESS]

    for file in files:
        response = file_upload_use_case(file)      
        current_code = HTTP_STATUS_CODES_MAPPING[response.response_type]
        if current_code != HTTP_STATUS_CODES_MAPPING[ResponseTypes.SUCCESS]:
            final_status_code = current_code
            
        all_responses.append(response.value)

    if len(all_responses) == 1:
        return Response(
            json.dumps(all_responses[0]),
            mimetype="application/json",
            status=final_status_code,
        )
    return Response(
        json.dumps({"files": all_responses}),
        mimetype="application/json",
        status=final_status_code,
    )

@blueprint.route('/api/data', methods=['GET'])
@cross_origin()
def get_data():
    '''
    This defines the API endpoint to test the server connection
    '''
    response = get_data_use_case()
    return jsonify(response.value), HTTP_STATUS_CODES_MAPPING[response.response_type]
