from flask import jsonify, request
from flask_cors import CORS
from models import User
from config import db, app, twilio

session = db.session

CORS(app)

# Routes
@app.route('/api/data', methods=['GET'])
def get_data():
    data = [{'id': 1, 'name': 'John'}, {'id': 2, 'name': 'Jane'}, {'id': 3, 'name': 'Bob'}]
    return jsonify(data)


@app.route('/api/users', methods=['GET'])
def get_users():
    users = session.query(User).all()
    serialized_users = [user.to_serialize() for user in users]
    return jsonify(serialized_users)

@app.route('/api/phone-intake')
def phone(): 
    # http://localhost:5000/api/phone-intake?number=4158865021
    to_number = request.args.get('number')
    message_text = 'Hello from Twilio!!'
    print('to_number.......', to_number)

    message = twilio.messages.create(
        body=message_text,
        from_='+18775220854',  # Twilio phone number
        to=to_number
    )

    return [to_number, message.sid]

if __name__ == '__main__':
    app.run()
