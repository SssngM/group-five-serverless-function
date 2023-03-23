from flask import jsonify
from flask_cors import CORS
from config import app
from models import User
from config import db

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

if __name__ == '__main__':
    app.run()
