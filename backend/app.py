from flask import jsonify, request
from flask_cors import CORS
from models import User, Event
from config import db, app, twilio
from datetime import datetime
import pytz

session = db.session

CORS(app)

# Routes
@app.route('/api/data', methods=['GET'])
def get_data():
    data = [{'id': 1, 'name': 'John'}, {'id': 2, 'name': 'Jane'}, {'id': 3, 'name': 'Bob'}]
    return jsonify(data)


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


@app.route('/api/phone-intake')
def phone(): 
    # http://localhost:5000/api/phone-intake?number=4158865021
    twilio_phone_number = '+18775220854'
    user_phone_number = request.args.get('number')
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
                meeting_id = 14332
                message_body = f'''You have successfully signed up for meeting id {meeting_id}. 
                    You can cancel anytime by responding : cancel {meeting_id}'''

                twilio.messages.create(
                    body=message_body,
                    from_= twilio_phone_number,
                    to=user_phone_number
                )

            else:
                message_body = f'''You have not joined the event'''

                twilio.messages.create(
                    body=message_body,
                    from_= twilio_phone_number,
                    to=user_phone_number
                )
            break

    return jsonify(user_phone_number)

if __name__ == '__main__':
    app.run()
