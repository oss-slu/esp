#!/bin/bash
# create a static directory in the application server
# front-end files will be placed there
mkdir -p server/application/static

# generate front-end files
cd client-app
npm install
npm run build

# copy front-end files to the application server
cp -r build/* ../server/application/static

# start the app
cd ../server
python -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
bash run_prod_server.sh