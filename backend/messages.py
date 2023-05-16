from config import twilio, twilio_phone_number
from datetime import datetime
import pytz

messaging_service_sid = 'MG86a6a7efc804ce62932f387a5386362c'

def send_message(user_phone_number, message_body):
    twilio.messages.create(
        body=message_body,
        from_= twilio_phone_number,
        to=user_phone_number,
    )

def send_timed_message(user_phone_number, message_body, send_time):
    twilio.messages.create(
        body=message_body,
        from_= twilio_phone_number,
        to=user_phone_number,
        messaging_service_sid=messaging_service_sid,
        send_at=send_time,
        schedule_type='fixed',
    )

def get_replied_message(user_phone_number):
    return twilio.messages.list(
        from_=user_phone_number,
        to=twilio_phone_number,
        date_sent_after=datetime.now(pytz.utc),
    )
