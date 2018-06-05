@echo OFF

set FLASK_APP=./index.py

pipenv shell

flask run -h 0.0.0.0