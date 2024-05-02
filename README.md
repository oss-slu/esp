# Electronic Structure Parser
Electronic structure parser was previously referred to as Orca Data Converter (or Orca Converter).

## Purpose
Orca Data Converter is a open-source quantum chemistry software package that can simulate molecular properties using quantum mechanical calculations. It is a web application that allows users to select their desired text file containing information regarding quantum chemistry software data. Then select the required fields from a multi select dropdown that is provided on UI. After conversion, user can download the file in .docx format, which contains the desired output. By using Orca Data  Converter, researchers can easily share data with collaborators who use different quantum chemistry software.


## Project Architecture
<img width="619" alt="image" src="https://user-images.githubusercontent.com/40460915/232928171-03d4110c-db6c-4db2-80ae-caab0955e2b8.png">

## How to Run in Mac
For Backend (directory: Backend):<code>
python3 -m venv venv 
source venv/bin/activate
pip install -r requirements.txt
</code>

(Change directory to src):<code>
python3 app.py
</code>

For Frontend (directory: client-app):<code>
npm install 
npm start 
</code>