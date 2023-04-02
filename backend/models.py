from config import db
from datetime import datetime


users_events = db.Table('users_events',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('event_id', db.Integer, db.ForeignKey('events.id'), primary_key=True)
)


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    users_events = db.relationship('Event', secondary=users_events, back_populates='attendees')

    def __repr__(self):
        return f"<User {self.name}>"

    def to_serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'phone_number': self.phone_number
        }
    

class Event(db.Model):
    __tablename__ = 'events'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    event_type = db.Column(db.Enum('restaurant', 'networking', name='event_type'))
    address = db.Column(db.String(100))
    url = db.Column(db.String(100))
    start_time = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    end_time = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    guest_max_count = db.Column(db.Integer, default=0)
    guest_min_count = db.Column(db.Integer)
    waitlist_max_count = db.Column(db.Integer)
    is_active = db.Column(db.Boolean)
    attendees = db.relationship('User', secondary=users_events, back_populates='users_events')

    def __repr__(self):
        return f"<Event {self.title}>"

    def to_serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'address': self.address,
            'url': self.url,
            'start_time': self.start_time,
            'end_time': self.end_time,
            'guest_max_count': self.guest_max_count,
            'guest_min_count': self.guest_min_count,
            'event_type': self.event_type,
            'waitlist_max_count': self.waitlist_max_count,
            'is_active': self.is_active,
        }

