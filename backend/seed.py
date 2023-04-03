from datetime import datetime

from config import db
from models import User, Event

from app import app


def seed_data():
    user1 = User(name="John Smith", phone_number="1234567890", user_type="admin")
    user2 = User(name="Jane Doe", phone_number="0987654321", user_type="free")
    user3 = User(name="Bob Johnson", phone_number="5551234567", user_type="free")

    db.session.add_all([user1, user2, user3])
    db.session.commit()

    event1 = Event(
        title="YH - BEIJING 颐和北京",
        address="500 Haight St San Francisco, CA 94117",
        restaurant_url="https://yh-beijing.com/",
        google_maps_url="https://www.google.com/maps/place/YH+-+BEIJING+%E9%A2%90%E5%92%8C%E5%8C%97%E4%BA%AC/@37.7721917,-122.4306187,15z/data=!4m6!3m5!1s0x808580a6c62a9fe5:0xb54e25c0baa0f59b!8m2!3d37.7721917!4d-122.4306187!16s%2Fg%2F11cfdbxxy",
        start_time=datetime(2023, 4, 15, 10, 0, 0),
        end_time=datetime(2023, 4, 15, 12, 0, 0),
        guest_max_count=6,
        guest_min_count=4,
        waitlist_max_count=6,
        event_type="restaurant",
        is_active=True,
        host=user1
    )
    event2 = Event(
        title="YH - BEIJING 颐和北京",
        address="500 Haight St San Francisco, CA 94117",
        restaurant_url="https://yh-beijing.com/",
        google_maps_url="https://www.google.com/maps/place/YH+-+BEIJING+%E9%A2%90%E5%92%8C%E5%8C%97%E4%BA%AC/@37.7721917,-122.4306187,15z/data=!4m6!3m5!1s0x808580a6c62a9fe5:0xb54e25c0baa0f59b!8m2!3d37.7721917!4d-122.4306187!16s%2Fg%2F11cfdbxxy",
        start_time=datetime(2023, 5, 1, 18, 0, 0),
        end_time=datetime(2023, 5, 1, 22, 0, 0),
        guest_max_count=6,
        guest_min_count=4,
        waitlist_max_count=6,
        event_type="restaurant",
        is_active=True,
        host=user1
    )
    event3 = Event(
        title="Iza Ramen",
        address="237 FILLMORE STREET SAN FRANCISCO CA 94117",
        restaurant_url="https://www.izaramen.com/?gclid=Cj0KCQjwz6ShBhCMARIsAH9A0qXm2Q6-uYtP5ll3IVmo4Xdn16VJyPmEBLPORV3nax40lO6l6zNCTdIaAqnzEALw_wcB",
        google_maps_url="https://www.google.com/maps/place/Iza+Ramen/@37.7717843,-122.432745,17z/data=!3m1!4b1!4m6!3m5!1s0x808580a6cff045ef:0x4334bb8f7636cf98!8m2!3d37.7717801!4d-122.4305563!16s%2Fg%2F11ckr8pzg4",
        start_time=datetime(2023, 6, 1, 14, 0, 0),
        end_time=datetime(2023, 6, 1, 18, 0, 0),
        guest_max_count=6,
        guest_min_count=4,
        waitlist_max_count=6,
        event_type="restaurant",
        is_active=False,
        host=user1
    )

    db.session.add_all([event1, event2, event3])
    db.session.commit()

    # Add attendees to events
    event1.attendees.extend([user1, user2])
    event2.attendees.extend([user1, user3])
    event3.attendees.append(user2)
    db.session.commit()


with app.app_context():
    db.drop_all()
    db.create_all()
    seed_data()
