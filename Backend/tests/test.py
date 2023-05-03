import sys
sys.path.insert(0, '../src')
import unittest
import json
from API import app




class TestFindSections(unittest.TestCase):

    def setUp(self):
        app.testing = True
        self.app = app.test_client()

    def test_missing_fields(self):
        # Test missing fields in the request
        data = {}
        response = self.app.post('/find-sections', data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_valid_request(self):
        # Test a valid request
        data = {
        'file_path': '/Users/samsam/Desktop/EXAMPLE.txt',
        'search_terms': [
        "CARTESIAN COORDINATES (A.U.)",
        "MULLIKEN ATOMIC CHARGES",
        "LOEWDIN ATOMIC CHARGES",
        "LOEWDIN REDUCED ORBITAL CHARGES"
        ],
        'sections': [
        [1, 2, 3],
        [1],
        [1],
        [1]
        ],
        'CustomFileName' :["DataOrca"]
        }
        response = self.app.post('/find-sections', data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 200)


if __name__ == '__main__':
    unittest.main()
