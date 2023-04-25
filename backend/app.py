from flask import jsonify, request
from flask_cors import CORS
from models import User, Event
from config import db, app, twilio
from datetime import datetime
import pytz

session = db.session

CORS(app)

# Routes
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

@app.route('/api/guestlist', methods=['POST'])
def add_user_to_guestlist():
    user_phone_number = request.json.get('phone_number')
    event_id = request.json.get('event_id')
    event = Event.query.get(event_id)

    if len(event.attendees) >= event.guest_max_count:
        return jsonify({'error': 'event full'}), 400
    else:
        twilio_phone_number = '+18775220854'
        message_body = "To confirm your number type: Ok"

        twilio.messages.create(
            body=message_body,
            from_= twilio_phone_number,
            to=user_phone_number
        )

        # Wait for user to reply
        while True:
            start_time = datetime.now(pytz.utc)

            replies = twilio.messages.list(
                from_=user_phone_number,
                to=twilio_phone_number,
                date_sent_after=start_time)

            
            if replies:
                user_choice = replies[0].body

                if user_choice.upper() == 'OK':
                    if not event:
                        return jsonify({'error': 'Event not found.'}), 404

                    user = User.query.filter_by(phone_number=user_phone_number).first()

                    if not user:
                        user = User(phone_number=user_phone_number)

                    if user in event.attendees:
                        return jsonify({'error': 'user already joined'}), 400

                    event.attendees.append(user)

                    message_body = f'''You have successfully joined meeting!'''

                    twilio.messages.create(
                        body=message_body,
                        from_= twilio_phone_number,
                        to=user_phone_number
                    )

                    db.session.commit()

                else:
                    message_body = f'''Something went wrong. Please try again.'''

                    twilio.messages.create(
                        body=message_body,
                        from_= twilio_phone_number,
                        to=user_phone_number
                    )
                break

    db.session.commit()

    return jsonify(event.to_serialize()), 200


if __name__ == '__main__':
    app.run()
