from flask import Flask, request, jsonify
from flask_cors import CORS
import logging

def create_app():
    app = Flask(__name__)
    CORS(app,origins="*")

    #make sure uploads directory exists
    uploads_dir = os.path.join(app.instance_path, 'uploads')
    os.makedirs(upload_dir, exist_ok=True)

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
        print('Content in request files', request.files)
        print('Content in request form', request.form)

        if 'file' not in request.files:
            return jsonify({"status": "error", "message": "No file in the request"})

        file = request.files['file']

        if file.filename == '':
            return jsonify({"status": "error", "message": "No selected file"})

        filename = os.path.join(uploads_dir, file.filename)
        file.save(filename)

        return jsonify({"status": "success", "message": "File uploaded successfully!"})
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True) 