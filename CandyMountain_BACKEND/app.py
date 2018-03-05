from flask import Flask, render_template, redirect, url_for, Response
from flask import request, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
from sqlalchemy.schema import Column
from sqlalchemy.types import Integer, String
from flask_wtf import Form
from wtforms import StringField
from wtforms.validators import Required, Length
from collections import defaultdict

from sqlalchemy import Table, MetaData
from sqlalchemy.sql import text
from sqlalchemy_views import CreateView, DropView
from sqlalchemy.engine import create_engine

from sqlalchemy.sql import select

import json
import time

app = Flask(__name__, static_url_path='')
app.config.from_pyfile('config.py')

db = SQLAlchemy(app)

engine = create_engine(
    'postgresql://milbbhguqvjxpt:2670f50724e1a0b2c2acce24bf5b27e7e5911291d31d9db492641438167abb87@ec2-54-235-252-137.compute-1.amazonaws.com:5432/d3o1rgu4g2e39m')


@app.route('/', methods=['GET', 'POST'])
def contacts():
    form = ContactForm()
    if form.validate_on_submit():
        contact = Contact()
        form.populate_obj(contact)
        db.session.add(contact)
        db.session.commit()
        return redirect(url_for('contacts'))
    contacts = Contact.query.all()
    return render_template('contacts.html', contacts=contacts, form=form)


@app.route('/photos/<path:path>')
def send_js(path):
    return send_from_directory('photos', path)


@app.route('/delete-contact/<int:id>')
def delete_contact(id):
    contact = Contact.query.get_or_404(id)
    db.session.delete(contact)
    db.session.commit()
    return redirect(url_for('contacts'))


@app.route('/user/<int:id>')
def getuser(id):
    stmt = 'SELECT * FROM users'
    results = db.session.connection().execute(stmt).fetchall()
    jsonResulList = []
    for result in results:
        json_res = {}
        json_res['email'] = result[1]
        json_res['age'] = result[2]
        jsonResulList.append(json_res)
    print(results)
    return Response(json.dumps(jsonResulList))


@app.route('/activity/<int:activity_id>')
def get_activity_by_id(activity_id):
    stmt1 = 'SELECT A.*, T.title' \
           ' FROM activities AS A, tags_in_activity AS TA, tags AS T' \
           ' WHERE A.activity_id = TA.activity_id AND TA.tag_id = T.tag_id' \
           ' AND A.activity_id = ' + str(activity_id)
    stmt2 = 'SELECT A.*' \
           ' FROM activities AS A, tags_in_activity AS TA, tags AS T' \
           ' WHERE A.activity_id = ' + str(activity_id)

    json_activity = {}
    tags = []
    results = db.session.connection().execute(stmt1).fetchall()
    if len(results) != 0:
        for result in results:
            tags.append(result[-1])
    else:
        results = db.session.connection().execute(stmt2).fetchall()
    json_activity['activity_id'] = results[0][0]
    json_activity['name'] = results[0][1]
    json_activity['description'] = results[0][2]
    json_activity['added_by'] = results[0][3]
    json_activity['latitude'] = results[0][4]
    json_activity['longitude'] = results[0][5]
    json_activity['likes'] = results[0][6]
    json_activity['tags'] = tags
    print(results)
    return Response(json.dumps(json_activity))


@app.route('/user/<int:user_id>/activities')
def get_user_activities(user_id):
    stmt = 'SELECT L.list_id, L.title, A.activity_id, A.title' \
           ' FROM user_subscriptions as US, lists as L, activities_in_lists as AL, activities as A' + \
           ' WHERE US.list_id = L.list_id AND US.user_id = ' + str(user_id) + \
           '    AND L.list_id = AL.list_id AND AL.activity_id = A.activity_id'
    results = db.session.connection().execute(stmt).fetchall()
    json_list = defaultdict(list)
    for result in results:
        json_activity = {}
        json_activity['list_id'] = result[0]
        json_activity['list_title'] = result[1]
        json_activity['activity_id'] = result[2]
        json_activity['name'] = result[3]
        json_list[result[0]].append(json_activity)
    jsonResultList = []
    for item in json_list.values():
        json_res = {}
        json_res['list_id'] = item[0]['list_id']
        json_res['list_title'] = item[0]['list_title']
        for elem in item:
            del elem['list_id']
            del elem['list_title']
        json_res['activities'] = item
        jsonResultList.append(json_res)
    print(results)
    return Response(json.dumps(jsonResultList))


@app.route('/user/login', methods=['POST'])
def login_user():
    user_json = request.get_json()
    print("Loggin user in %s" % user_json)
    found_user = find_user_by_email(user_json['email'])
    if(found_user == -1):
        return Response(status="User does not exist"), 400
    else:
        print("found user %s" % user_json['email'])
        if(user_json['password'] == found_user['password']):
            return Response(response=json.dumps(found_user), status="User logged in", mimetype='application/json'), 200
        else:
            return Response(status="Password don't match"), 400

@app.route('/user/register', methods=['POST'])
def register_user():
    print('user wants to register')
    #print(request.data)
    jsonData = json.loads(request.data)
    found_user = find_user_by_email(jsonData['email'])
    if(found_user != -1):
        return Response(status="User already exists"), 400
    else:
        print("TRYING TO ADD NEW USER")
        # metadata = MetaData()
        # users_table = Table("users", metadata, autoload=True, autoload_with=db.get_engine())
        # print(db.get_engine())
        # print(users_table)
        # insertion = users_table.insert().values(email = jsonData['email'], password=jsonData['password'], age=jsonData['age'])
        # db.session.connection().execute(insertion)
        stmt = "INSERT INTO users (email, password, age) VALUES ( \'" + jsonData['email'] + "\', \'" +  jsonData['password'] + "\'," + jsonData['age'] + ')'
        print(stmt)
        db.get_engine().connect().execute(stmt)
        return Response(status="User registered"),200

def find_user_by_email(email):
    print('searching for %s' % email)
    stmt = "SELECT * FROM users WHERE email = '" + email + "'"
    results = db.session.connection().execute(stmt).fetchall()
    print("Results for searching for user %s" % results)
    if(len(results) > 0):
        result = results[0]
        user_json = {}
        user_json['id'] = result[0]
        user_json['email'] = result[1]
        user_json['password'] = result[2]
        user_json['age'] = result[4]

        return user_json
    else:
        return -1




@app.route('/user/<int:user_id>/recommendation')
def get_user_recommendation(user_id):

    metadata = MetaData()

    view_cur_user_acts = Table('current_user_acts', metadata)
    definition_cur_user_acts = text('SELECT DISTINCT US.user_id, A.activity_id ' \
        'FROM user_subscriptions as US, lists as L, activities_in_lists as AL, activities as A ' \
        'WHERE US.list_id = L.list_id AND US.user_id = ' + str(user_id) + ' ' \
        'AND L.list_id = AL.list_id AND AL.activity_id = A.activity_id; ')
    create_view_cur_user_acts = CreateView(view_cur_user_acts, definition_cur_user_acts, or_replace=True)
    engine.execute(create_view_cur_user_acts)

    view_recom_users = Table('recommended_users', metadata)
    definition_recom_users = text(
        ' SELECT US.user_id' \
        ' FROM current_user_acts as A1, user_subscriptions as US, ' \
        ' lists as L, activities_in_lists as AL, activities as A ' \
        ' WHERE A.activity_id = A1.activity_id and US.user_id != a1.user_id and US.list_id = L.list_id ' \
        ' and L.list_id = AL.list_id and AL.activity_id = A.activity_id ' \
        ' GROUP BY US.user_id ' \
        ' HAVING COUNT(*) >= 2; ' \
        )
    create_view_recom_users = CreateView(view_recom_users, definition_recom_users, or_replace=True)
    engine.execute(create_view_recom_users)

    stmt = 'SELECT DISTINCT A.activity_id, A.title ' \
        'FROM user_subscriptions as US, lists as L, activities_in_lists as AL, activities as A, ' \
        'current_user_acts as CUA, recommended_users as RU ' \
        'WHERE US.user_id = RU.user_id AND US.list_id = L.list_id ' \
        'AND L.list_id = AL.list_id AND AL.activity_id = A.activity_id AND ' \
        'A.activity_id NOT IN (SELECT activity_id FROM current_user_acts) ' \
        'LIMIT 8'
    results = db.session.connection().execute(stmt).fetchall()

    json_list = defaultdict(list)
    for result in results:
        json_activity = {}
        json_list['list_id'] = 0
        json_list['list_title']  = 'Recommended for You'
        json_activity['activity_id'] = result[0]
        json_activity['name'] = result[1]
        json_list['activities'].append(json_activity)
    jsonResultList = []
    jsonResultList.append(json_list)
    return Response(json.dumps(jsonResultList))





@app.route('/activities/<string:search_word>')
def get_activities_search(search_word):
    stmt = 'SELECT L.list_id, L.title, A.*' \
           'FROM lists as L, activities_in_lists as AL, activities as A ' \
           'WHERE L.list_id = AL.list_id AND AL.activity_id = A.activity_id ' \
           '    AND A.title LIKE \'%%' + search_word + '%%\''
    results = db.session.connection().execute(stmt).fetchall()
    json_list = defaultdict(list)
    for result in results:
        json_activity = {}
        json_activity['list_id'] = result[0]
        json_activity['list_title'] = result[1]
        json_activity['activity_id'] = result[2]
        json_activity['name'] = result[3]
        json_list[result[0]].append(json_activity)
    jsonResultList = []
    for item in json_list.values():
        json_res = {}
        json_res['list_id'] = item[0]['list_id']
        json_res['list_title'] = item[0]['list_title']
        for elem in item:
            del elem['list_id']
            del elem['list_title']
        json_res['activities'] = item
        jsonResultList.append(json_res)
    print(results)
    return Response(json.dumps(jsonResultList))


@app.route('/activities', methods=['GET'])
def getactivities():
    stmt = 'SELECT * FROM activities'
    results = db.session.connection().execute(stmt).fetchall()
    jsonResulList = []
    for result in results:
        json_res = {}
        json_res['id'] = result[0]
        json_res['name'] = result[1]
        json_res['description'] = result[2]
        json_res['added_by'] = result[3]
        json_res['latitude'] = result[4]
        json_res['longitude'] = result[5]
        json_res['likes'] = result[6]
        jsonResulList.append(json_res)
    print(results)
    return Response(json.dumps(jsonResulList))


@app.route('/subscriptions/<int:user_id>', methods=['GET'])
def get_subscriptions(user_id):
    stmt = 'SELECT * FROM user_subscriptions WHERE user_id = 1'
    results = db.session.connection().execute(stmt).fetchall()
    jsonResulList = []
    for result in results:
        json_res = {}
        json_res['list_id'] = result[0]
        json_res['user_id'] = result[1]
        jsonResulList.append(json_res)
    print(results)
    return Response(json.dumps(jsonResulList))


# @app.route('/conference-twiml')
# def conference_twiml():
#     twiml_response = twiml.Response()
#     twiml_response.dial().conference('pycontacts')
#     return Response(str(twiml_response))


class Contact(db.Model):
    __tablename__ = 'contacts'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    phone_number = db.Column(db.String(32))

    def __repr__(self):
        return '<Contact {0} {1}: {2}>'.format(self.first_name,
                                               self.last_name,
                                               self.phone_number)


class ContactForm(Form):
    first_name = StringField('First Name', validators=[Required(),
                                                       Length(1, 100)])
    last_name = StringField('Last Name', validators=[Required(),
                                                     Length(1, 100)])
    phone_number = StringField('Phone Number', validators=[Required(),
                                                           Length(1, 32)])


if __name__ == "__main__":
    app.run("0.0.0.0", port=5000, debug=True)
