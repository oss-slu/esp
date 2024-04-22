import os
import sys
import unittest
import json

#Get absolute path to the directory containing the script
current_dir = os.path.dirname(os.path.abspath(__file__))

#Get the path for the project directory
project_dir = os.path.join(current_dir, '..', 'src')

#Add file_path directory
file_path = os.path.abspath(os.path.join(current_dir, '..', '..', 'inputs', 'working', 'Styrene-ad1.txt'))

#Add this path to sys.path to allow script to work universally
sys.path.insert(0, project_dir)
#sys.path.insert(0, '/Users/seala/csci4961/esp/Backend/src')


from app import app_instance as app
print(sys.path)


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
            'file_path': file_path,
            'search_terms': ["CARTESIAN COORDINATES (A.U.)"],
            'sections': [1],
            'specify_lines': 'LAST 5',
            'use_total_lines': False,
            'lines': 10
        }
        response = self.app.post('/find-sections', data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()
