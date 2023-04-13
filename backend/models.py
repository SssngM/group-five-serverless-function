from config import db

# DB model
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    email = db.Column(db.String(120), unique=True)

    def to_serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email
        }

