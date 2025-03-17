from io import BytesIO
import re

def extract_sections(file_paths, search_terms, sections, specify_lines, use_total_lines, total_lines):
    '''
    Extracts the data from orca log file based on search terms and sections.
    '''
    all_results = {}
    
    for file_path in file_paths:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                lines = f.readlines()
        except FileNotFoundError:
            all_results[file_path] = f"File not found: {file_path}"
            continue
    

        document_content = ""

        # Define the regex pattern for the header
        header_pattern = r'^\s*NO\s+LB\s+ZA\s+FRAG\s+MASS\s+X\s+Y\s+Z\s*$'

        # Function to determine if a line is content
        def is_content_line(line, term, header_pattern=None):
            if line.strip() == "":
                return False
            if line.startswith("-----"):
                return False
            if line.startswith(term):
                return False
            if header_pattern and re.match(header_pattern, line):
                return False
            return True

        def is_end_pattern(lines, index):
            """
            Check if the current line and subsequent lines
            form an end pattern.
            Returns:
            True if an end pattern is detected, False otherwise.
            """
            if index + 3 >= len(lines):
                return False

            current_line = lines[index].strip()
            next_line = lines[index + 1].strip()
            two_lines_after = lines[index + 2].strip()
            three_lines_after = lines[index + 3].strip()
            is_next_two_lines_empty = (next_line == '' and two_lines_after == '')

            starts_with_delimiter = (current_line.startswith('-') or current_line.startswith('*'))
            repeated_in_following_lines = (current_line in two_lines_after or
                                        current_line in three_lines_after)
            next_line_not_delimiter = not (next_line.startswith('---') or next_line.startswith('***'))

            is_end_pattern_flag = ((starts_with_delimiter and
                    repeated_in_following_lines and
                    next_line_not_delimiter) or is_next_two_lines_empty)

            return is_end_pattern_flag

        term_line_nums = {term: [] for term in search_terms}  

        for term in search_terms:
            line_num = 0
            for line in lines:
                if term in line:
                    term_line_nums[term].append(line_num)
                line_num += 1

        if not any(term_line_nums.values()):
            all_results[file_path] = "No matching data found."

        for term in search_terms:
            term_line_num = term_line_nums[term]
            for i in range(len(sections)):
                section_lines = specify_lines[i].split()
                start_line = term_line_num[i] if i < len(term_line_num) else None
                if start_line is None:
                    continue  # Skip this section if the term is not found

                line_empty = 0
                document_content += f"\n**{term} found in {file_path} at line {start_line}:**\n"
                document_content += lines[start_line]

                if section_lines[0].upper() == 'WHOLE' and not use_total_lines:
                    while line_empty == 0:
                        if term not in lines[start_line].strip() and is_content_line(
                                lines[start_line], term, header_pattern):
                            document_content += lines[start_line]
                        if is_end_pattern(lines, start_line):
                            break
                        start_line += 1

                if section_lines[0].upper() == 'WHOLE' and use_total_lines:
                    for _ in range(total_lines - start_line + term_line_num[i]):
                        if term not in lines[start_line].strip() and is_content_line(
                                lines[start_line], term, header_pattern):
                            document_content += lines[start_line]
                        if is_end_pattern(lines, start_line):
                            break
                        start_line += 1
                        line_empty = 1

                elif section_lines[0].upper() == 'FIRST':
                    line_count = 0
                    while line_count < int(section_lines[1]):
                        if term not in lines[start_line].strip() and is_content_line(
                                                    lines[start_line], term, header_pattern):
                            document_content += lines[start_line]
                            line_count += 1
                        if is_end_pattern(lines, start_line):
                            break
                        start_line += 1

                elif section_lines[0].upper() == 'LAST':
                    temp_content = []
                    while start_line < len(lines):
                        if is_end_pattern(lines, start_line):
                            break
                        if is_content_line(lines[start_line], term, header_pattern):
                            temp_content.append(lines[start_line])
                        start_line += 1
                    document_content += ''.join(temp_content[-int(section_lines[1]):])

                elif section_lines[0].upper() == 'SPECIFIC':
                    specific_lines = [int(l) for l in section_lines[1].split(",")]
                    for l in specific_lines:
                        if start_line + l < len(lines) and not is_end_pattern(lines, start_line + l):
                            if is_content_line(lines[start_line + l], term, header_pattern):
                                document_content += lines[start_line + l]

        all_results[file_path] = document_content if document_content else "No matching data found."

    return all_results

def save_document_to_bytes(document):
    '''
    Save the Word document to a byte string
    '''
    file_stream = BytesIO()
    document.save(file_stream)
    return file_stream.getvalue()
