from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from docx import Document
from pathlib import Path
import logging
import os
import json

def create_app():
    app = Flask(__name__)
    CORS(app)

    uploads_dir = os.path.join(app.instance_path, 'uploads')
    os.makedirs(uploads_dir, exist_ok=True)

    def extract_sections(file_path, search_terms, sections, specify_lines, use_total_lines, total_lines):
        '''
        Extracts the data from orca log file based on search terms and sections.
        '''
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()

        document_content = ""

        for term in search_terms:
            line_num = 0
            term_line_num = []
            terms_num = 0
            for line in lines:
                if term in line:
                    term_line_num.append(line_num)
                    terms_num += 1
                line_num += 1

        for i in sections:
            section_lines = specify_lines[i-1].split()
            start_line = term_line_num[i-1]
            line_empty = 0

            def is_content_line(line):
                return not (line.strip() == "" or line.startswith("-----") or line.startswith("Title:"))

            if section_lines[0].upper() == 'WHOLE' and not use_total_lines:
                while line_empty == 0:
                    if lines[start_line] != "\n" and is_content_line(lines[start_line]):
                        document_content += lines[start_line]
                        start_line += 1
                    else:
                        line_empty = 1

            elif section_lines[0].upper() == 'WHOLE' and use_total_lines:
                for _ in range(total_lines - start_line + term_line_num[i-1]):
                    if is_content_line(lines[start_line]):
                        document_content += lines[start_line]
                    start_line += 1
                    line_empty = 1

            elif section_lines[0].upper() == 'FIRST':
                line_count = 0
                while line_count < int(section_lines[1]):
                    if is_content_line(lines[start_line]):
                        document_content += lines[start_line]
                        line_count += 1
                    start_line += 1

            elif section_lines[0].upper() == 'LAST':
                line_count = 0
                document_content += lines[start_line]
                document_content += lines[start_line + 1]
                while line_count < int(section_lines[1]) - 1:
                    if is_content_line(lines[start_line + 10]):
                        document_content += lines[start_line + 10]
                    start_line += 1
                    line_count += 1

            elif section_lines[0].upper() == 'SPECIFIC':
                specific_lines = [int(l) for l in section_lines[1].split(",")]
                if is_content_line(lines[start_line]):
                    document_content += lines[start_line]
                for l in specific_lines:
                    if is_content_line(lines[start_line + l + 1]):
                        document_content += lines[start_line + l + 1]

        return document_content

    @app.route('/preview', methods=['POST'])
    def preview_document():
        data = request.get_json(force=True)

        file_path = data.get('file_path')
        search_terms = data.get('search_terms')
        sections = data.get('sections')
        temp_specify_lines = data.get('specify_lines')
        use_total_lines = data.get('use_total_lines', False)
        total_lines = data.get('total_lines', 2000)

        if not all([file_path, search_terms, sections, temp_specify_lines]):
            return jsonify({'error': 'Missing required fields'}), 400

        sections = list(map(int, sections))
        specify_lines = [temp_specify_lines] * len(sections)

        document_content = extract_sections(file_path, search_terms, sections, specify_lines, use_total_lines, total_lines)

        return jsonify({'document_content': document_content}), 200

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
            return {'message': 'Success', 'filename': filename}, 200
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

    @app.route('/find-sections', methods=['POST'])
    def find_sections():
        data = request.get_json(force=True)

        file_path = data.get('file_path')
        search_terms = data.get('search_terms')
        sections = data.get('sections')
        temp_specify_lines = data.get('specify_lines')
        use_total_lines = data.get('use_total_lines', False)
        total_lines = data.get('total_lines', 2000)

        if not all([file_path, search_terms, sections, temp_specify_lines]):
            return jsonify({'error': 'Missing required fields'}), 400

        sections = list(map(int, sections))
        specify_lines = [temp_specify_lines] * len(sections)

        document_content = extract_sections(file_path, search_terms, sections, specify_lines, use_total_lines, total_lines)

        document = Document()

        for paragraph in document_content.split('\n'):
            document.add_paragraph(paragraph.strip())

        try:
            docx_bytes = save_document_to_bytes(document)
            response = make_response(docx_bytes)
            response.headers.set('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
            response.headers.set('Content-Disposition', 'attachment', filename='output.docx')
            return response
        except Exception as e:
            return f'Error saving document: {e}', 500

    def save_document_to_bytes(document):
        """Save the Word document to a byte string."""
        from io import BytesIO
        file_stream = BytesIO()
        document.save(file_stream)
        return file_stream.getvalue()

    return app

app_instance = None

if __name__ == "__main__":
    app_instance = create_app()
    app_instance.run(debug=True)
else:
    app_instance = create_app()
