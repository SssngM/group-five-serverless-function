
# import the User model and any other necessary dependencies
from config import db
from models import User
from sqlalchemy.exc import IntegrityError
from config import app

# create some dummy user data
users = [
    {
        "name": "John Doe",
        "email": "johndoe@example.com"
    },
    {
        "name": "Jane Smith",
        "email": "janesmith@example.com"
    },
    {
        "name": "Bob Johnson",
        "email": "bob@example.com"
    }
]

# add the users to the database
with app.app_context():
    for user_data in users:
        user = User(**user_data)
        db.session.add(user)
        try:
            db.session.commit()
        except IntegrityError:
            db.session.rollback()

