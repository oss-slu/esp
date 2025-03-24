//issue152 PR
from responses import ResponseSuccess, ResponseFailure, ResponseTypes
from services.file_upload_operations import save_uploaded_file

def file_upload_use_case(file):
    '''
    Uploads the file to temp folder
    '''
    if file.filename == '':
        return ResponseFailure(ResponseTypes.PARAMETER_ERROR, 'No selected file')

    if file.mimetype != 'text/plain':
        return ResponseFailure(ResponseTypes.PARAMETER_ERROR, 'Invalid file type')

    try:
        file_path = save_uploaded_file(file)
        file_name = file.filename
        return ResponseSuccess({'message': 'Success', 'file_name': file_name,
                                 'file_path': file_path})
    except PermissionError as e:
        return ResponseFailure(ResponseTypes.PARAMETER_ERROR, f'Permission denied: {str(e)}')
    except FileNotFoundError as e:
        return ResponseFailure(ResponseTypes.PARAMETER_ERROR, f'File not found: {str(e)}')
    except ValueError as e:
        return ResponseFailure(ResponseTypes.PARAMETER_ERROR, f'Value error: {str(e)}')

def get_data_use_case():
    '''
    sample data to test the server connection
    '''
    data = {
        'options': [
            {'label': 'Option 1', 'value': 1},
            {'label': 'Option 2', 'value': 2},
            {'label': 'Option 3', 'value': 3}
        ]
    }
    return ResponseSuccess(data)
