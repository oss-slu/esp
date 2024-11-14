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

## Contributing

To get started contributing to the project, see the [contributing guide](CONTRIBUTING.md).
This document also includes guidelines for reporting bugs and proposing new features.
