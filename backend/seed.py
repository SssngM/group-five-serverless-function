
# import the User model and any other necessary dependencies
from models import User
from sqlalchemy.exc import IntegrityError
from config import app, db

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
    db.create_all() # this will be ignored if the tables are already created
    for user_data in users:
        user = User(**user_data)
        db.session.add(user)
        try:
            db.session.commit()
        except IntegrityError:
            db.session.rollback()

