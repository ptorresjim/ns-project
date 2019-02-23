from app.api import bp
from flask import jsonify, g
from app.models import User, Task
from flask import request
from app import db
from app.api.auth import token_auth
from flask_login import  logout_user
from werkzeug.security import generate_password_hash

@bp.route('/users/<int:id>', methods=['GET'])
@token_auth.login_required
def get_user(id):
    return jsonify(User.query.get_or_404(id).to_dict())

@bp.route('/users', methods=['GET'])
@token_auth.login_required
def get_users():
    data = User.query.all()
    data = [u.to_dict() for u in data]
    return jsonify(data)

@bp.route('/users', methods=['POST'])
def create_user():
    data = request.get_json() or {}
    user = User(username=data['username'],password_hash=generate_password_hash(data['password']))
    db.session.add(user)
    db.session.commit()
    response = jsonify(user.to_dict())
    response.status_code = 201
    return response

@bp.route('/tasks/<int:id>', methods=['POST'])
@token_auth.login_required
def create_task(id):
    data = request.get_json() or {}
    task = Task(title=data['title'],description=data['description'],user_id=id)
    db.session.add(task)
    db.session.commit()
    response = jsonify(task.to_dict())
    response.status_code = 201
    return response

@bp.route('/tasks', methods=['GET'])
@token_auth.login_required
def get_tasks():
    data = request.get_json() or {}
    tasks = Task.query.filter_by(user_id=g.current_user.id)
    data = [t.to_dict() for t in tasks]
    response = jsonify(data)
    response.status_code = 200
    return response

@bp.route('/logout', methods=['POST'])
@token_auth.login_required
def logout():
    logout_user()
    g.current_user.revoke_token()
    db.session.commit()
    response = jsonify({'msg':'ok'})
    response.status_code = 200
    return response