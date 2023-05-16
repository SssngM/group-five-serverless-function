from config import db
from datetime import datetime


users_guestlists = db.Table('users_guestlists',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('event_id', db.Integer, db.ForeignKey('events.id'), primary_key=True)
)

users_waitlists = db.Table('users_waitlists',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('event_id', db.Integer, db.ForeignKey('events.id'), primary_key=True)
)


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    phone_number = db.Column(db.String(20), nullable=False)
    user_type = db.Column(db.Enum('free', 'paid', 'admin', name='user_type'), default='free')
    users_guestlists = db.relationship('Event', secondary=users_guestlists, back_populates='attendees')
    users_waitlists = db.relationship('Event', secondary=users_waitlists, back_populates='waitlistees')

    def __repr__(self):
        return f"<User {self.name}>"

    def to_serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'phone_number': self.phone_number,
            'user_type': self.user_type
        }
    

class Event(db.Model):
    __tablename__ = 'events'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    event_type = db.Column(db.Enum('restaurant', 'networking', name='event_type'))
    address = db.Column(db.String(100))
    restaurant_url = db.Column(db.String(5000))
    google_maps_url = db.Column(db.String(5000))
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime)
    first_reminder_alert_time = db.Column(db.DateTime)
    second_reminder_alert_time = db.Column(db.DateTime)
    guest_max_count = db.Column(db.Integer)
    guest_min_count = db.Column(db.Integer)
    waitlist_max_count = db.Column(db.Integer)
    is_active = db.Column(db.Boolean, default=True)
    host_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    host = db.relationship('User', backref='hosted_events')
    attendees = db.relationship('User', secondary=users_guestlists, back_populates='users_guestlists')
    waitlistees = db.relationship('User', secondary=users_waitlists, back_populates='users_waitlists')

    def __repr__(self):
        return f"<Event {self.title}>"

    def to_serialize(self):
        attendees_list = [attendee.to_serialize() for attendee in self.attendees]
        waitlistees_list = [waitlistee.to_serialize() for waitlistee in self.waitlistees]
        return {
            'id': self.id,
            'title': self.title,
            'event_type': self.event_type,
            'address': self.address,
            'restaurant_url': self.restaurant_url,
            'google_maps_url': self.google_maps_url,
            'start_time': self.start_time,
            'end_time': self.end_time,
            'guest_max_count': self.guest_max_count,
            'guest_min_count': self.guest_min_count,
            'waitlist_max_count': self.waitlist_max_count,
            'is_active': self.is_active,
            'attendees': attendees_list,
            'waitlistees': waitlistees_list,
        }

