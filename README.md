# Group Five

First time startup

create database from terminal 
  $ create_db group_five

create virtual environment
  python3 -m venv venv
  pip3 install -r requirements.txt

seed db
  python seed.py


Backend: 
  flask python
  $ flask run

  to seed the database

    create the db in psql once
    $ createdb group_five

    then run
    $ python3 seed.py
    comment or uncoment the following lines at the bottom of the file as needed 

    with app.app_context():
        # db.create_all()
        # db.drop_all()
        # seed_data()

Frontend: 
  React javaScript
  $ npm start

Twilio environmental variables (or .zshrc etc.)
  $ export TWILIO_ACCOUNT_SID=XXXXXXXXXXXX
  $ export TWILIO_AUTH_TOKEN=XXXXXXXXXXXX

