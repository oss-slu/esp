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
    '''
    This defines the API endpoint to upload input file
    '''
    if 'file' not in request.files:
        return Response(
            json.dumps({'message': 'No file part'}),
            mimetype="application/json",
            status=HTTP_STATUS_CODES_MAPPING[ResponseTypes.PARAMETER_ERROR],
        )

    file = request.files['file']
    response = file_upload_use_case(file)

    return Response(
        json.dumps(response.value),
        mimetype="application/json",
        status=HTTP_STATUS_CODES_MAPPING[response.response_type],
    )

@blueprint.route('/api/data', methods=['GET'])
@cross_origin()
def get_data():
    '''
    This defines the API endpoint to test the server connection
    '''
    response = get_data_use_case()
    return jsonify(response.value), HTTP_STATUS_CODES_MAPPING[response.response_type]
