from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
import os

def create_app():
    app = Flask(__name__)
    CORS(app)

    uploads_dir = os.path.join(app.instance_path, 'uploads')
    os.makedirs(uploads_dir, exist_ok=True)

    @app.route('/upload', methods=['POST'])
    def file_upload():
        if 'file' not in request.files:
            logging.error('No file part in request')
            return {'message': 'No file part'}, 400
        
        file = request.files['file']
        
        if file.filename == '':
            logging.error('No selected file')
            return {'message': 'No selected file'}, 400
        
        if file and file.mimetype == 'text/plain':
            filename = os.path.join(uploads_dir, file.filename)
            file.save(filename)
            print('File received successfully')
            return {'message': 'Success'}, 200  
        else:
            logging.error('Invalid file type')
            return {'message': 'Invalid file type'}, 400

    @app.route('/api/data', methods=['GET'])
    def get_data():
        data = {
            'options': [
                {'label': 'Option 1', 'value': 1},
                {'label': 'Option 2', 'value': 2},
                {'label': 'Option 3', 'value': 3}
            ]
        }
        return jsonify(data), 200

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
