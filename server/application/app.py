"""
This module handles the creation of Flask app
"""
from flask import Flask
from application.rest import upload_files
from application.rest import search_orca_data

def create_app(config_name):
    '''
    The function  creates the Flask application.
    '''
    app = Flask(__name__)
    config_module = f"application.config.{config_name.capitalize()}Config"
    app.config.from_object(config_module)
    app.register_blueprint(upload_files.blueprint)
    app.register_blueprint(search_orca_data.blueprint)

    return app
