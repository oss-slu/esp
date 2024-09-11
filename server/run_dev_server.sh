#!/bin/bash

# Add the desired directory to PYTHONPATH
export PYTHONPATH="/Users/sirichandanagarimella/Documents/OSS/pr_validations/esp/server:$PYTHONPATH"

export FLASK_APP=wsgi.py
export FLASK_CONFIG="development"
python -m flask run --host=0.0.0.0 --port=5001