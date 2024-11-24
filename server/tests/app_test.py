"""Unit tests for the API endpoints and use cases."""

import unittest
from unittest.mock import patch, mock_open, MagicMock
from io import BytesIO
from flask import Flask
from application.rest.search_orca_data import blueprint as search_blueprint
from application.rest.upload_files import blueprint as upload_blueprint
from responses import ResponseSuccess, ResponseTypes
from usecases.search_orca_data import preview_document_use_case
from services.file_search_operations import ExtractionConfig

class TestAPI(unittest.TestCase):
    """Test suite for API endpoints and use cases."""

    def setUp(self):
        """Set up the Flask test client."""
        self.app = Flask(__name__)
        self.app.config['TESTING'] = True
        self.app.register_blueprint(search_blueprint)
        self.app.register_blueprint(upload_blueprint)
        self.client = self.app.test_client()

    @patch('application.rest.search_orca_data.preview_document_use_case')
    def test_preview_document(self, mock_preview):
        """Test the preview document endpoint."""
        mock_response = ResponseSuccess({'document_content': 'Test content'})
        mock_response.response_type = ResponseTypes.SUCCESS
        mock_preview.return_value = mock_response

        response = self.client.post('/preview', json={
            'file_path': 'test.txt',
            'search_terms': ['test'],
            'sections': [1],
            'specify_lines': '10'
        })

        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Test content', response.data)

    @patch('application.rest.search_orca_data.find_sections_use_case')
    def test_find_sections(self, mock_find):
        """Test the find sections endpoint."""
        mock_response = ResponseSuccess(b'Test document content')
        mock_response.response_type = ResponseTypes.SUCCESS
        mock_find.return_value = mock_response

        response = self.client.post('/find-sections', json={
            'file_path': 'test.txt',
            'search_terms': ['test'],
            'sections': [1],
            'specify_lines': '10'
        })

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, b'Test document content')

    @patch('application.rest.upload_files.file_upload_use_case')
    def test_file_upload(self, mock_upload):
        """Test the file upload endpoint."""
        mock_response = ResponseSuccess({'message': 'Success', 'filename': 'test.txt'})
        mock_response.response_type = ResponseTypes.SUCCESS
        mock_upload.return_value = mock_response

        response = self.client.post('/upload', data={
            'file': (BytesIO(b'test content'), 'test.txt')
        })

        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Success', response.data)

    @patch('application.rest.upload_files.get_data_use_case')
    def test_get_data(self, mock_get_data):
        """Test the get data endpoint."""
        mock_response = ResponseSuccess({'options': [{'label': 'Option 1', 'value': 1}]})
        mock_response.response_type = ResponseTypes.SUCCESS
        mock_get_data.return_value = mock_response

        response = self.client.get('/api/data')

        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Option 1', response.data)

    @patch('usecases.search_orca_data.ORCALogExtractor')
    def test_preview_document_use_case(self, mock_extractor_class):
        """Test the preview document use case."""
        # Mock the ORCALogExtractor instance and its method
        mock_extractor = MagicMock()
        mock_extractor.extract_sections.return_value = 'Extracted content'
        mock_extractor_class.return_value = mock_extractor

        data = {
            'file_path': 'test.txt',
            'search_terms': ['test'],
            'sections': [1],
            'specify_lines': '10'
        }

        mock_file_content = "This is a test file content"
        mock_file = mock_open(read_data=mock_file_content)

        with patch('builtins.open', mock_file):
            response = preview_document_use_case(data)

        # Assertions
        self.assertIsInstance(response, ResponseSuccess)
        self.assertEqual(response.value, {'document_content': 'Extracted content'})

        # Assert ORCALogExtractor was instantiated correctly
        mock_extractor_class.assert_called_once_with('test.txt')

        # Assert extract_sections was called with the correct arguments
        mock_extractor.extract_sections.assert_called_once_with(
            search_terms=['test'],
            sections=[1],
            specify_lines=['10'],
            config=ExtractionConfig(use_total_lines=False, total_lines=None)
        )

if __name__ == '__main__':
    unittest.main()
