import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

USER = os.environ.get('USER')
PSQL_PASSWORD = os.environ.get('PSQL_PASSWORD')

app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{USER}:{PSQL_PASSWORD}@localhost/group_five'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
