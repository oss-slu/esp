"""
This module contains the RESTful route handlers
for starting frontend service.
"""
from flask import Blueprint, send_from_directory, send_file
import os

APP_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATIC_FOLDER = os.path.join(APP_ROOT, 'static')
NESTED_STATIC = os.path.join(STATIC_FOLDER,'static')

blueprint = Blueprint("start_application", __name__,
	static_folder=None)

@blueprint.route('/static/css/<path:filename>')
def serve_css(filename):
	css_file_dir = os.path.join(NESTED_STATIC,'css')
	return send_from_directory(css_file_dir, filename)

@blueprint.route('/static/js/<path:filename>')
def serve_js(filename):
	js_file_dir = os.path.join(NESTED_STATIC,'js')
	return send_from_directory(js_file_dir, filename)

@blueprint.route('/')
@blueprint.route('/<path:path>')
def serve(path=''):
	print("path",path)
	print("static folder path",STATIC_FOLDER)
	print("static folder exists", os.path.exists(STATIC_FOLDER))
	print("nested static folder path",os.path.join(STATIC_FOLDER,'static'))
	print("static folder exists", os.path.exists(os.path.join(STATIC_FOLDER,'static')))

	if path and path not in ['static', 'static/'] and os.path.exists(os.path.join(STATIC_FOLDER,path)):
		return send_from_directory(STATIC_FOLDER, path)

	print(f"static folder path: {STATIC_FOLDER}")
	print(f"Index.html path: {os.path.join(STATIC_FOLDER, 'index.html')}")

	return send_file(os.path.join(STATIC_FOLDER,'index.html'))
