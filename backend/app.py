from flask import jsonify, request, url_for
from flask_cors import CORS
from models import User, Event
from config import db, app, twilio
from datetime import datetime
from datetime import timedelta
import pytz
from messages import send_message, send_timed_message, get_replied_message

from dateutil.parser import parse

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
    twilio_phone_number = '+18775220854'
    status_callback_url = request.url_root + url_for('webhook')

    message_body = 'Respond Yes'

    twilio.messages.create(
        body=message_body,
        from_= twilio_phone_number,
        to=4158865021,
        status_callback=status_callback_url,
    )

    # data = request.get_json()
    # print('request.data...............', request.data)
    # start_time_str = data.get('start_time')

    # Define the UTC timezone
    # utc_tz = pytz.timezone('UTC')

    # Convert start_time_str and end_time_str to datetime objects
    # start_time_utc = datetime.fromisoformat(start_time_str.replace('Z', '+00:00'))

    # Convert start_time_utc and end_time_utc to UTC timezone
    # start_time_utc = utc_tz.normalize(start_time_utc.astimezone(utc_tz))

    # Calculate the time difference between start_time_utc and current UTC time
    # time_diff_seconds = (start_time_utc - datetime.utcnow()).total_seconds()

    # # Raise an error if the time difference is less than 15 minutes or more than 7 days
    # if time_diff_seconds < 900 or time_diff_seconds > 604800:
    #     raise ValueError('SendAt time must be between 900 seconds and 7 days in the future')


    # twilio.messages.create(
    #     body='Hello, this is a scheduled message! Please type Yes if you received it',
    #     from_= twilio_phone_number,
    #     to='4158865021',
    #     messaging_service_sid='MG86a6a7efc804ce62932f387a5386362c',
    #     send_at=start_time_utc,
    #     schedule_type='fixed',
    #     status_callback='webhook',
    # )

    return jsonify('success')


@app.route('/api/create_event', methods=['POST'])
def create_event():
    twilio_phone_number = '+18775220854'

    title = request.json['title']
    address = request.json['address']
    restaurant_url = request.json['restaurant_url']
    google_maps_url = request.json['google_maps_url']
    start_time = parse(request.json['start_time'])
    end_time = parse(request.json['end_time'])
    first_reminder_alert_time = parse(request.json['first_reminder_alert_time'])
    second_reminder_alert_time = parse(request.json['second_reminder_alert_time'])
    guest_max_count = request.json['guest_max_count']
    guest_min_count = request.json['guest_min_count']
    waitlist_max_count = request.json['waitlist_max_count']
    host_phone_number = request.json['your_phone_number']

    if host_phone_number != '4158865021':
        return jsonify({'message': 'You are not authorized to create an event at this time'}), 200
    else:
        send_message(host_phone_number, "Respond 'Yes' to create this event, 'No' to cancel")

        while True:
            replies = get_replied_message(host_phone_number)

            if replies:
                user_choice = replies[0].body

                if user_choice.upper() == 'YES':

                    host = User.query.filter_by(phone_number='4158865021').first()

                    if host:
                        new_event = Event(
                            title=title,
                            event_type='restaurant',
                            address=address,
                            restaurant_url=restaurant_url,
                            google_maps_url=google_maps_url,
                            start_time=start_time,
                            end_time=end_time,
                            first_reminder_alert_time=first_reminder_alert_time,
                            second_reminder_alert_time=second_reminder_alert_time,
                            guest_max_count=guest_max_count,
                            guest_min_count=guest_min_count,
                            waitlist_max_count=waitlist_max_count,
                            host_id=host.id,
                        )

                        db.session.add(new_event)
                        db.session.commit()
                        send_message(host_phone_number, "Your event was created successfully")

                        return jsonify({'message': 'Your Event was created successfully'}), 200
                    else:
                        return jsonify({'error': 'Was unable to find your number, Event was not created.'}), 400
                else:
                    return jsonify({'message': 'Unable to authenticate your number, Event was not created.'}), 200


@app.route('/api/guestlist', methods=['POST'])
def add_user_to_guestlist():
    user_phone_number = request.json.get('phone_number')
    event_id = request.json.get('event_id')
    event = Event.query.get(event_id)

    if not event:
        return jsonify({'error': 'Event not found.'}), 404

    if len(event.attendees) >= event.guest_max_count:
        return jsonify({'error': 'guestlist full'}), 400

    message_body = "To confirm your number type: Ok"
    send_message(user_phone_number, message_body)

    # Wait for user to reply
    while True:
        replies = get_replied_message(user_phone_number)
        
        if replies:
            user_choice = replies[0].body

            if user_choice.upper() == 'OK':

                user = User.query.filter_by(phone_number=user_phone_number).first()

                if not user:
                    user = User(phone_number=user_phone_number)

                if user in event.attendees:
                    return jsonify({'error': 'user already joined guestlist'}), 400

                event.attendees.append(user)

                message_body = f'''You have successfully joined meeting!'''
                send_message(user_phone_number, message_body)

                timed_message_body = f'''You have joined the guestlist for meeting for {'title'} on Friday at 6:00pm. To confirm type Yes or No'''

                webhook_url = request.url_root + 'webhook'

                send_time = datetime(2023, 4, 30, 19, 35)
                twilio_phone_number = '+18775220854'
                twilio.messages.create(
                    body=timed_message_body,
                    from_= twilio_phone_number,
                    to=user_phone_number,
                    messaging_service_sid=messaging_service_sid,
                    send_at=send_time,
                    schedule_type='fixed',
                    status_callback=webhook_url,
                )

                db.session.commit()

            else:
                message_body = f'''You have declined to join the meeting.'''
                send_message(user_phone_number, message_body)
            break

    db.session.commit()

    return jsonify(event.to_serialize()), 200


@app.route('/webhook', methods=['POST'])
def webhook():
    response = MessagingResponse()
    message = request.form.get('Body')
    print('/webkook hit')

    if message.lower() == 'yes':
        # Process user's response here
        response.message('Thank you for confirming!')

    return str(response)


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
