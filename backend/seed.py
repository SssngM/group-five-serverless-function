from datetime import datetime

from config import db
from models import User, Event

from app import app


def seed_data():
    user1 = User(name="John Smith", phone_number="1234567890")
    user2 = User(name="Jane Doe", phone_number="0987654321")
    user3 = User(name="Bob Johnson", phone_number="5551234567")

    db.session.add_all([user1, user2, user3])
    db.session.commit()

    event1 = Event(
        title="Networking Event",
        address="123 Main St",
        url="https://example.com/networking-event",
        start_time=datetime(2023, 4, 15, 10, 0, 0),
        end_time=datetime(2023, 4, 15, 12, 0, 0),
        guest_max_count=50,
        guest_min_count=10,
        event_type="networking",
        is_active=True
    )
    event2 = Event(
        title="Restaurant Opening",
        address="456 Elm St",
        url="https://example.com/restaurant-opening",
        start_time=datetime(2023, 5, 1, 18, 0, 0),
        end_time=datetime(2023, 5, 1, 22, 0, 0),
        guest_max_count=100,
        event_type="restaurant",
        waitlist_max_count=50,
        is_active=True
    )
    event3 = Event(
        title="Charity Fundraiser",
        address="789 Oak St",
        url="https://example.com/charity-fundraiser",
        start_time=datetime(2023, 6, 1, 14, 0, 0),
        end_time=datetime(2023, 6, 1, 18, 0, 0),
        guest_max_count=200,
        guest_min_count=10,
        event_type="networking",
        waitlist_max_count=100,
        is_active=False
    )

    db.session.add_all([event1, event2, event3])
    db.session.commit()

    # Add attendees to events
    event1.attendees.extend([user1, user2])
    event2.attendees.extend([user1, user3])
    event3.attendees.append(user2)
    db.session.commit()


with app.app_context():
    # db.drop_all()
    # db.create_all()
    # seed_data()
