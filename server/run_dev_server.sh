#!/bin/bash

export FLASK_APP=wsgi.py
export FLASK_CONFIG="development"
flask run --debug -h 0.0.0.0 -p 5001