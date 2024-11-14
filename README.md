# Electronic Structure Parser
Electronic structure parser was previously referred to as Orca Data Converter (or Orca Converter).

## Purpose
Orca Data Converter is a open-source quantum chemistry software package that can simulate molecular properties using quantum mechanical calculations. It is a web application that allows users to select their desired text file containing information regarding quantum chemistry software data. Then select the required fields from a multi select dropdown that is provided on UI. After conversion, user can download the file in .docx format, which contains the desired output. By using Orca Data  Converter, researchers can easily share data with collaborators who use different quantum chemistry software.


## Project Architecture
<img width="619" alt="image" src="https://user-images.githubusercontent.com/40460915/232928171-03d4110c-db6c-4db2-80ae-caab0955e2b8.png">


## Getting Started

To run the code using one command with Docker Compose, please follow the below instructions:

1. Install Docker on your computer if you do not have one (https://www.docker.com/get-started/)

2. Open the Docker app to start the docker engine (if you are on windows, open services.msc using run command and make sure the docker desktop service is running)

3. Open terminal or shell and run the below command in the the cloned repository
<br><code>docker-compose up</code>

4. This will start your web application in http://localhost:3000

To start the components individually, please follow the below instructions:

1. To start the client-app: [client-app README.md](client-app/README.md/)
2. To start the server: [server README.md](server/README.md)

## Steps to use the application:

1. For input, you can select any ORCA log file. The test log files are in the esp/test-data/orca-files.
2. Once the input is provided, click on upload.
3. Provide the search term
4. Provide the lines specified as:  WHOLE or FIRST N (where N = number of lines. Ex: FIRST 5 or FIRST 10) or LAST N (where N = number of lines. Ex: LAST  5 or LAST 10)
5. Provide the sections (cycle from which the data must be extracted) as 1 or 1,2 or 1,2,3
6. The ‘Use total lines’ and ‘Total number of lines for output doc’ are non-mandatory fields and can be left blank.
7. Click on the ‘Preview Output’ button to view the data extraction results
8. Click on the ‘Download Output’ button to download the data extraction results as a WORD document

## Contributing

To get started contributing to the project, see the [contributing guide](CONTRIBUTING.md).
This document also includes guidelines for reporting bugs and proposing new features.
