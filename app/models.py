#!/usr/bin/env python
# encoding: utf-8
"""
@version: python3.7
@author: JYFelt
@license: Apache Licence 
@contact: JYFelt@163.com
@site: https://blog.csdn.net/weixin_38034182
@software: PyCharm
@file: models.py
@time: 2019/2/1 22:29
"""
from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from . import login_manager
import datetime


class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    users = db.relationship('User', backref='role', lazy='dynamic')


class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, index=True)
    role_id = db.Column(db.ForeignKey('roles.id'))
    password_hash = db.Column(db.String(128))
    events = db.relationship('Event', backref='sponsor', lazy='dynamic')

    @property
    def password(self):
        raise AttributeError('psw is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class Event(db.Model):
    __tablename__ = 'events'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64))
    category = db.Column(db.String(64))
    completion = db.Column(db.Boolean)
    create_time = db.Column(db.DateTime, index=True, default=datetime.datetime.utcnow)
    sponsor_id = db.Column(db.Integer, db.ForeignKey('users.id'))


class Category(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)

    @staticmethod
    def insert_categories():
        categories = ['学习', '游戏', '休闲', '娱乐']
        for c in categories:
            category = Category.query.filter_by(name=c).first()
            if not category:
                category = Category(name=c)
            db.session.add(category)
        db.session.commit()

    def __repr__(self):
        return self.name
