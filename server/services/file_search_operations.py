from io import BytesIO

def extract_sections(file_path, search_terms, sections, specify_lines, use_total_lines,
                     total_lines):
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

        if section_lines[0].upper() == 'WHOLE' and not use_total_lines:
            while line_empty == 0:
                if lines[start_line] != "\n":
                    document_content += lines[start_line]
                    start_line += 1
                else:
                    line_empty = 1

        if section_lines[0].upper() == 'WHOLE' and use_total_lines:
            for _ in range(total_lines - start_line + term_line_num[i-1]):
                document_content += lines[start_line]
                start_line += 1
                line_empty = 1

        elif section_lines[0].upper() == 'FIRST':
            line_count = 0
            while line_count < int(section_lines[1]):
                document_content += lines[start_line]
                start_line += 1
                line_count += 1

        elif section_lines[0].upper() == 'LAST':
            line_count = 0
            document_content += lines[start_line]
            document_content += lines[start_line + 1]
            while line_count < int(section_lines[1]) - 1:
                document_content += lines[start_line+10]
                start_line += 1
                line_count += 1

        elif section_lines[0].upper() == 'SPECIFIC':
            specific_lines = [int(l) for l in section_lines[1].split(",")]
            document_content += lines[start_line]
            for l in specific_lines:
                document_content += lines[start_line + l + 1]

    return document_content

def save_document_to_bytes(document):
    '''
    Save the Word document to a byte string
    '''
    file_stream = BytesIO()
    document.save(file_stream)
    return file_stream.getvalue()
