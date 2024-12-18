'''
This module contains functions for handling file upload operations.
'''

import os
from flask import current_app

def get_uploads_dir():
    '''
    gets the path of uploaded dir
    '''
    uploads_dir = os.path.join(current_app.instance_path, 'uploads')
    os.makedirs(uploads_dir, exist_ok=True)
    return uploads_dir

def save_uploaded_file(file):
    '''
    saves the uploaded file to the uploads directory
    '''
    uploads_dir = get_uploads_dir()
    filename = os.path.join(uploads_dir, file.filename)
    file.save(filename)
    return filename
