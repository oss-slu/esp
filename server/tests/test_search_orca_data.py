import unittest
from unittest.mock import patch, mock_open, Mock
from flask import Flask
from application.rest.search_orca_data import blueprint
from responses import ResponseSuccess

class TestSearchOrcaData(unittest.TestCase):
    def setUp(self):
        self.app = Flask(__name__)
        self.app.register_blueprint(blueprint)
        self.client = self.app.test_client()

    @patch('application.rest.search_orca_data.find_sections_use_case')
    def test_find_sections_docx_format(self, mock_find_sections):
        mock_find_sections.return_value = ResponseSuccess(b'docx content')
        
        response = self.client.post('/find-sections', json={
            'file_path': 'test.txt',
            'format': 'docx',
            'search_terms': ['test'],
            'sections': ['1'],
            'specify_lines': 'WHOLE'
        })

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.headers['Content-Type'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        )

    @patch('application.rest.search_orca_data.find_sections_use_case')
    @patch('application.rest.search_orca_data.convert')
    @patch('builtins.open', new_callable=mock_open, read_data=b'pdf content')
    @patch('os.path.exists')
    @patch('os.remove')
    @patch('os.rmdir')
    def test_find_sections_pdf_format(
        self, mock_rmdir, mock_remove, mock_exists, 
        mock_file, mock_convert, mock_find_sections
    ):
        # Setup mocks
        mock_exists.return_value = True
        mock_find_sections.return_value = ResponseSuccess(b'docx content')
        
        response = self.client.post('/find-sections', json={
            'file_path': 'test.txt',
            'format': 'pdf',
            'search_terms': ['test'],
            'sections': ['1'],
            'specify_lines': 'WHOLE'
        })

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers['Content-Type'], 'application/pdf')
        mock_convert.assert_called_once()

if __name__ == '__main__':
    unittest.main()