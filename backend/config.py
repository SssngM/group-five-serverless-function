import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from twilio.rest import Client

app = Flask(__name__)


#### DB config ############################################### 

USER = os.environ.get('USER')
PSQL_PASSWORD = os.environ.get('PSQL_PASSWORD')

app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{USER}:{PSQL_PASSWORD}@localhost/group_five'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

#### Twilio config ###########################################

account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']

twilio = Client(account_sid, auth_token)
