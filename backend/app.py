from flask import jsonify, request
from flask_cors import CORS
from models import User, Event
from config import db, app, twilio
from datetime import datetime
import pytz
from messages import send_message, send_timed_message, get_replied_message

session = db.session
CORS(app)

@app.route('/api/events', methods=['GET'])
def get_events():
    events = session.query(Event).all()
    serialized_events = [event.to_serialize() for event in events]
    print('serialized_events...', serialized_events)
    return jsonify(serialized_events)


@app.route('/api/users', methods=['GET'])
def get_users():
    users = session.query(User).all()
    serialized_users = [user.to_serialize() for user in users]
    return jsonify(serialized_users)


@app.route('/api/timed_message', methods=['GET'])
def timed_message():
    send_time = datetime(2023, 5, 1, 15, 52)
    send_time_iso = send_time.isoformat() + 'Z'
    twilio_phone_number = '+18775220854'
    print('/api/timed_message')

    message = twilio.messages.create(
        to='4158865021',
        from_=twilio_phone_number,
        body='Hello, this is a scheduled message!',
        send_at=send_time_iso,
    )

    return jsonify('success')


@app.route('/api/guestlist', methods=['POST'])
def add_user_to_guestlist():
    user_phone_number = request.json.get('phone_number')
    event_id = request.json.get('event_id')
    event = Event.query.get(event_id)

    if len(event.attendees) >= event.guest_max_count:
        return jsonify({'error': 'guestlist full'}), 400
    else:
        message_body = "To confirm your number type: Ok"
        send_message(user_phone_number, message_body)

        # Wait for user to reply
        while True:
            replies = get_replied_message(user_phone_number)
            
            if replies:
                user_choice = replies[0].body

                if user_choice.upper() == 'OK':
                    if not event:
                        return jsonify({'error': 'Event not found.'}), 404

                    user = User.query.filter_by(phone_number=user_phone_number).first()

                    if not user:
                        user = User(phone_number=user_phone_number)

                    if user in event.attendees:
                        return jsonify({'error': 'user already joined guestlist'}), 400

                    event.attendees.append(user)

                    message_body = f'''You have successfully joined meeting!'''
                    send_message(user_phone_number, message_body)

                    db.session.commit()

                else:
                    message_body = f'''You have declined to join the meeting.'''
                    send_message(user_phone_number, message_body)
                break

    db.session.commit()

    return jsonify(event.to_serialize()), 200


@app.route('/api/waitlist', methods=['POST'])
def add_user_to_waitlist():
    user_phone_number = request.json.get('phone_number')
    event_id = request.json.get('event_id')
    event = Event.query.get(event_id)

    if len(event.waitlistees) >= event.waitlist_max_count:
        return jsonify({'error': 'waitlist full'}), 400
    else:
        message_body = "To confirm your number type: Ok"
        send_message(user_phone_number, message_body)

        # Wait for user to reply
        while True:
            replies = get_replied_message(user_phone_number)
            
            if replies:
                user_choice = replies[0].body

                if user_choice.upper() == 'OK':
                    if not event:
                        return jsonify({'error': 'Event not found.'}), 404

                    user = User.query.filter_by(phone_number=user_phone_number).first()

                    if not user:
                        user = User(phone_number=user_phone_number)

                    if user in event.attendees:
                        return jsonify({'error': 'user already joined guestlist'}), 400

                    if user in event.waitlistees:
                        return jsonify({'error': 'user already joined waitlist'}), 400

                    event.waitlistees.append(user)

                    message_body = f'''You have successfully joined the waitlist'''
                    send_message(user_phone_number, message_body)

                    db.session.commit()

                else:
                    message_body = f'''You have declined to join the meeting.'''
                    send_message(user_phone_number, message_body)

                break

    db.session.commit()

    return jsonify(event.to_serialize()), 200




if __name__ == '__main__':
    app.run()
