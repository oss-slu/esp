from io import BytesIO
import re
import spacy
from typing import List, Optional, Tuple
from difflib import SequenceMatcher

class ORCALogProcessor:
    def __init__(self):
        """
        Initialize NLP processor and patterns
        """
        self.nlp = spacy.load("en_core_web_sm")
        self.header_pattern = r'^\s*NO\s+LB\s+ZA\s+FRAG\s+MASS\s+X\s+Y\s+Z\s*$'
        
        # Basic section patterns for NLP enhancement
        self.section_patterns = {
            "GIBBS FREE ENERGY": ["gibbs", "free energy"],
            "CARTESIAN COORDINATES": ["cartesian", "cartesian coordinates (angstroem)", "cartesian coordinates (a.u.)"],
            "INNER ENERGY": ["inner energy", "total energy"],
            "GEOMETRY OPTIMIZATION CYCLE": ["geometry optimization cycle"]
        }

    def _find_cycle_boundaries(self, lines: List[str]) -> List[Tuple[int, int, int]]:
        """
        Find start and end lines for each optimization cycle
        """
        cycle_boundaries = []
        cycle_pattern = re.compile(r'.*GEOMETRY\s+OPTIMIZATION\s+CYCLE\s+(\d+).*')
        
        for i, line in enumerate(lines):
            match = cycle_pattern.match(line.strip())
            if match and '*' in line:
                cycle_num = int(match.group(1))
                if cycle_boundaries:
                    cycle_boundaries[-1] = (cycle_boundaries[-1][0], i - 1, cycle_boundaries[-1][2])
                cycle_boundaries.append((i, len(lines), cycle_num))

        if cycle_boundaries:
            last_start, _, last_num = cycle_boundaries[-1]
            cycle_boundaries[-1] = (last_start, len(lines), last_num)
            
        return cycle_boundaries

    def extract_sections(self, file_path: str, search_terms: List[str], sections: List[int], 
                         specify_lines: List[str], use_total_lines: bool = False, 
                         total_lines: int = 2000) -> str:
        """
        Extract sections from the ORCA log file
        """
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()

        document_content = ""
        cycle_boundaries = self._find_cycle_boundaries(lines)

        for i in sections:
            # Find the corresponding cycle
            cycle_info = None
            for start, end, cycle_num in cycle_boundaries:
                if cycle_num == i:
                    cycle_info = (start, end, cycle_num)
                    break
            
            if not cycle_info:
                document_content += f"\nWarning: GEOMETRY OPTIMIZATION CYCLE {i} not found\n"
                continue
                
            cycle_start, cycle_end, cycle_num = cycle_info
            document_content += f"\nFrom GEOMETRY OPTIMIZATION CYCLE {cycle_num}:\n"

            terms_found = set()

            # Find all sections within this cycle
            current_line = cycle_start
            while current_line < cycle_end:
                line = lines[current_line].strip()
                
                if current_line > 0 and current_line < len(lines) - 1:
                    prev_line = lines[current_line-1].strip()
                    next_line = lines[current_line+1].strip()
                    
                    for term in search_terms:
                        is_header = (
                            (prev_line.startswith('---') or prev_line.startswith('*')) and 
                            (next_line.startswith('---') or next_line.startswith('*')) and
                            (term in line or self._nlp_match_section(line, term))
                        )
                        
                        if is_header:
                            terms_found.add(term)

                            document_content += lines[current_line] + '\n'
                            section_start = current_line + 1
                            
                            if specify_lines[0].upper().startswith('WHOLE'):
                                content_line = section_start
                                while content_line < cycle_end:
                                    if self._is_end_pattern(lines, content_line) or (
                                        content_line + 1 < len(lines) and 
                                        self._is_any_header(lines, content_line + 1)):
                                        break
                                    if self._is_content_line(lines[content_line], term, self.header_pattern):
                                        document_content += lines[content_line]
                                    content_line += 1

                            elif specify_lines[0].upper().startswith('FIRST'):
                                num_lines = int(specify_lines[0].split()[1])
                                lines_added = 0
                                content_line = section_start
                                while lines_added < num_lines and content_line < cycle_end:
                                    if self._is_end_pattern(lines, content_line) or (
                                        content_line + 1 < len(lines) and 
                                        self._is_any_header(lines, content_line + 1)):
                                        break
                                    if self._is_content_line(lines[content_line], term, self.header_pattern):
                                        document_content += lines[content_line]
                                        lines_added += 1
                                    content_line += 1

                            elif specify_lines[0].upper().startswith('LAST'):
                                temp_content = []
                                content_line = section_start
                                while content_line < cycle_end:
                                    if self._is_end_pattern(lines, content_line) or (
                                        content_line + 1 < len(lines) and 
                                        self._is_any_header(lines, content_line + 1)):
                                        break
                                    if self._is_content_line(lines[content_line], term, self.header_pattern):
                                        temp_content.append(lines[content_line])
                                    content_line += 1
                                num_lines = int(specify_lines[0].split()[1])
                                document_content += ''.join(temp_content[-num_lines:])

                            elif specify_lines[0].upper().startswith('SPECIFIC'):
                                specific_lines = [int(l) for l in specify_lines[0].split()[1].split(",")]
                                for l in specific_lines:
                                    target_line = section_start + l
                                    if target_line < cycle_end and target_line < len(lines):
                                        if not self._is_end_pattern(lines, target_line) and self._is_content_line(
                                                lines[target_line], term, self.header_pattern):
                                            document_content += lines[target_line]

                current_line += 1

            missing_terms = set(search_terms) - terms_found
            for term in missing_terms:
                document_content += f"Warning: {term} not found in GEOMETRY OPTIMIZATION CYCLE {cycle_num}\n"

        return document_content

    def _nlp_match_section(self, line: str, term: str) -> bool:
        """
        Enhanced NLP-based section matching with 
        lemmatization and exact checks.
        """
        line_lower = line.lower().strip()
        term_lower = term.lower().strip()

        # Lemmatize the term and line for accurate comparison
        lemmatized_line = self._lemmatize_term(line_lower)
        lemmatized_term = self._lemmatize_term(term_lower)

        for key, variations in self.section_patterns.items():
            for variation in variations:
                lemmatized_variation = self._lemmatize_term(variation.lower())
                
                if lemmatized_term in lemmatized_variation or lemmatized_variation in lemmatized_term:
                    if lemmatized_variation in lemmatized_line:
                        return True
                # Fuzzy matching check for similar terms
                similarity = SequenceMatcher(None, lemmatized_term, lemmatized_variation).ratio()
                if similarity >= 0.9 and lemmatized_variation in lemmatized_line:
                    return True

        return False

    def _lemmatize_term(self, term: str) -> str:
        """
        Lemmatize the input term using spaCy.
        """
        doc = self.nlp(term)
        return " ".join([token.lemma_ for token in doc])

    def _is_any_header(self, lines: List[str], index: int) -> bool:
        """
        Check if line is any kind of section header
        """
        if index <= 0 or index >= len(lines) - 1:
            return False
                
        line = lines[index].strip()
        prev_line = lines[index-1].strip()
        next_line = lines[index+1].strip()
        
        return (prev_line.startswith('---') or prev_line.startswith('*')) and \
               (next_line.startswith('---') or next_line.startswith('*'))

    def _is_content_line(self, line: str, term: str, header_pattern: Optional[str] = None) -> bool:
        """
        Content line detection
        """
        line = line.strip()
        if not line:
            return False
        if line.startswith("-----"):
            return False
        if line.startswith(term):
            return False
        if header_pattern and re.match(header_pattern, line):
            return False
        return True

    def _is_end_pattern(self, lines: List[str], index: int) -> bool:
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
        repeated_in_following_lines = (current_line in two_lines_after or current_line in three_lines_after)
        next_line_not_delimiter = not (next_line.startswith('---') or next_line.startswith('***'))

        is_end_pattern_flag = ((starts_with_delimiter and
                repeated_in_following_lines and
                next_line_not_delimiter) or is_next_two_lines_empty)

        return is_end_pattern_flag
def save_document_to_bytes(document):
    """
    Save the Word document to a byte string
    """
    file_stream = BytesIO()
    document.save(file_stream)
    return file_stream.getvalue()
