from flask import Flask, request
from docx import Document

app = Flask(__name__)

@app.route('/find-sections', methods=['POST'])
def find_sections():
    # Check for missing request data
    if 'file_path' not in request.json:
        return 'Missing file_path field', 400
    if 'search_terms' not in request.json:
        return 'Missing search_terms field', 400
    if 'sections' not in request.json:
        return 'Missing sections field', 400
    if 'specifyLines' not in request.json:
        return 'Missing specifyLines field', 400
    if 'use_total_lines' not in request.json:
        return 'Missing use_total_lines field', 400
    if 'lines' not in request.json:
        return 'Missing lines field', 400

    # Get the file path from the request
    file_path = request.json['file_path']

    # Read the file
    with open(file_path, 'r') as f:
        Lines = f.readlines()

    # Get the search terms, sections, and lines from the request
    search_terms = request.json['search_terms']
    sections = request.json['sections']
    specifyLines = request.json['specifyLines']
    use_total_lines = request.json['use_total_lines']
    total_lines = request.json['lines']

    # Create a new document
    document = Document()

    # Iterate over the search terms and find the corresponding sections
    for term in search_terms:
        lineNo = 0
        termLineNo = []
        termsNum = 0
        for line in Lines:
            if term in line:
                termLineNo.append(lineNo)
                termsNum += 1
                print(termsNum, term)
            lineNo += 1

        # Add the sections to the document
        for i in sections:
            section_lines = specifyLines[i-1].split()
            start_line = termLineNo[i-1]
            line_empty = 0

            if section_lines[0] == 'WHOLE' and use_total_lines == False:
                while line_empty == 0:
                    if Lines[start_line] != "\n":
                        section = document.add_paragraph(Lines[start_line])
                        start_line += 1
                    else:
                        line_empty = 1

            if section_lines[0] == 'WHOLE' and use_total_lines == True:
                for _ in range(total_lines - start_line + termLineNo[i-1]):
                    section = document.add_paragraph(Lines[start_line])
                    start_line += 1
                    line_empty = 1
                else:
                    start_line += 1
                    line_empty = 1

            elif section_lines[0] == 'FIRST':
                line_count = -1
                while line_count < int(section_lines[1]):
                    section = document.add_paragraph(Lines[start_line])
                    start_line += 1
                    line_count += 1

            elif section_lines[0] == 'LAST':
                line_count = -1
                document.add_paragraph(Lines[start_line])
                document.add_paragraph(Lines[start_line + 1])
                while line_count < int(section_lines[1]):
                    section = document.add_paragraph(Lines[start_line+10])
                    start_line += 1
                    line_count += 1

            elif section_lines[0] == 'SPECIFIC':
                specific_lines = [int(l) for l in section_lines[1].split(",")]
                document.add_paragraph(Lines[start_line])
                for l in specific_lines:
                    section = document.add_paragraph(Lines[start_line + l + 1])

    try:
        # Save the document
        document.save("/Users/samsam/orca_converter/Backend/docs/data_conversion.docx")
    except Exception as e:
        return f'Error saving document: {e}', 500

    return 'OK'

if __name__ == '__main__':
    app.run(debug=True)