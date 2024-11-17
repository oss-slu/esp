"""
Module for extracting sections from ORCA log files based on search terms
and saving the extracted data to a byte stream.
"""

from io import BytesIO
import re

class ORCALogExtractor:
    """
    Class for extracting sections from an ORCA log file based on search terms
    and saving the extracted data to a byte stream.
    """

    def __init__(self, file_path):
        """
        Initialize the extractor with the file path.

        :param file_path: Path to the ORCA log file
        """
        self.file_path = file_path
        with open(file_path, 'r', encoding='utf-8') as file:
            self.lines = file.readlines()
        self.header_pattern = r'^\s*NO\s+LB\s+ZA\s+FRAG\s+MASS\s+X\s+Y\s+Z\s*$'

    def is_content_line(self, line, term):
        """
        Check if a line is content based on the given term and header pattern.

        :param line: The line to check
        :param term: The search term to exclude
        :return: True if the line is content, False otherwise
        """
        if line.strip() == "" or line.startswith("-----") or line.startswith(term):
            return False
        return not (self.header_pattern and re.match(self.header_pattern, line))

    def is_end_pattern(self, index):
        """
        Determine if the current line forms an end pattern.

        :param index: Index of the current line
        :return: True if the line forms an end pattern, False otherwise
        """
        if index + 3 >= len(self.lines):
            return False

        current_line = self.lines[index].strip()
        next_line = self.lines[index + 1].strip()
        two_lines_after = self.lines[index + 2].strip()
        three_lines_after = self.lines[index + 3].strip()
        is_next_two_lines_empty = (next_line == '' and two_lines_after == '')

        starts_with_delimiter = current_line.startswith(("-", "*"))
        repeated_in_following_lines = (
            current_line in two_lines_after or current_line in three_lines_after
        )
        next_line_not_delimiter = not next_line.startswith(("---", "***"))

        return (
            starts_with_delimiter
            and repeated_in_following_lines
            and next_line_not_delimiter
        ) or is_next_two_lines_empty

    def find_term_lines(self, search_terms):
        """
        Find all line numbers where the search terms appear.

        :param search_terms: List of search terms
        :return: List of line numbers for each term
        """
        term_line_num = []
        for term in search_terms:
            term_line_num.extend(
                i for i, line in enumerate(self.lines) if term in line
            )
        return term_line_num

    def extract_section(self, start_line, section_lines, search_term):
        """
        Extract a specific section from the log file.

        :param start_line: The starting line index
        :param section_lines: Details of the section to extract
        :param search_term: Search term to exclude from content
        :return: Extracted section content
        """
        document_content = ""

        if section_lines[0].upper() == 'WHOLE':
            document_content += self._extract_whole(start_line, search_term)

        elif section_lines[0].upper() == 'FIRST':
            document_content += self._extract_first(start_line, search_term, int(section_lines[1]))

        elif section_lines[0].upper() == 'LAST':
            document_content += self._extract_last(start_line, search_term, int(section_lines[1]))

        elif section_lines[0].upper() == 'SPECIFIC':
            document_content += self._extract_specific(start_line, section_lines[1], search_term)

        return document_content

    def extract_sections(self, search_terms, sections, specify_lines):
        """
        Extract multiple sections based on search terms and configuration.

        :param search_terms: List of search terms
        :param sections: List of sections to extract
        :param specify_lines: Specifications for each section
        :return: Extracted document content
        """
        term_line_num = self.find_term_lines(search_terms)
        document_content = ""

        for i, section in enumerate(sections):
            start_line = term_line_num[i]
            section_lines = specify_lines[section - 1].split()
            search_term = search_terms[0]
            document_content += self.extract_section(start_line, section_lines, search_term)

        return document_content

    def _extract_whole(self, start_line, search_term):
        content = ""
        while True:
            if self.is_content_line(self.lines[start_line], search_term):
                content += self.lines[start_line]
            if self.is_end_pattern(start_line):
                break
            start_line += 1
        return content

    def _extract_first(self, start_line, search_term, count):
        content = ""
        line_count = 0
        while line_count < count:
            if self.is_content_line(self.lines[start_line], search_term):
                content += self.lines[start_line]
                line_count += 1
            if self.is_end_pattern(start_line):
                break
            start_line += 1
        return content

    def _extract_last(self, start_line, search_term, count):
        temp_content = []
        while start_line < len(self.lines):
            if self.is_end_pattern(start_line):
                break
            if self.is_content_line(self.lines[start_line], search_term):
                temp_content.append(self.lines[start_line])
            start_line += 1
        return ''.join(temp_content[-count:])

    def _extract_specific(self, start_line, specific_lines, search_term):
        specific_lines = [int(l) for l in specific_lines.split(",")]
        content = ""
        for l in specific_lines:
            if start_line + l < len(self.lines):
                if self.is_content_line(self.lines[start_line + l], search_term):
                    content += self.lines[start_line + l]
        return content

def save_document_to_bytes(document):
    """
    Save the Word document to a byte stream.

    :param document: Document to save
    :return: Byte stream of the saved document
    """
    file_stream = BytesIO()
    document.save(file_stream)
    return file_stream.getvalue()
