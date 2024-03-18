from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
import os
from werkzeug.utils import secure_filename

def create_app():
    app = Flask(__name__)
    CORS(app, origins="*")

    # Make sure uploads directory exists
    uploads_dir = os.path.join(app.instance_path, 'uploads')
    os.makedirs(uploads_dir, exist_ok=True)

    @app.route('/api/data', methods=['GET'])
    def get_data():
        data = {"message": "Hello from Flask!"}
        return jsonify(data)

    @app.route('/api/message', methods=['POST'])
    def receive_message():
        message_data = request.json
        message = message_data.get('message', '')
        logging.basicConfig(level=logging.DEBUG)
        logging.debug(f"Received message: {message}")
        print(f"Received message: {message}")
        return jsonify({"status": "success", "message": "Message received successfully!"})

    @app.route('/api/upload', methods=['POST'])
    def file_upload():
        if 'file' not in request.files:
            return {'message': 'No file part'}, 400
    
        file = request.files['file']
    
        if file.filename == '':
            return {'message': 'No selected file'}, 400
    
        if file and file.mimetype == 'text/plain':
            # Process the file here
            filename = secure_filename(file.filename)
            file.save(os.path.join(uploads_dir, filename))
            return {'message': 'File uploaded successfully'}, 200
        else:
            return {'message': 'Invalid file type'}, 400

    @app.route('/api/submit', methods=['POST'])
    def submit_data():
        data = request.json
        filename = data.get('fileName')
        return jsonify({"status": "success", "message": "Data submitted"})

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
