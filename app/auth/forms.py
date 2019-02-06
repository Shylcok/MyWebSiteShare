#!/usr/bin/env python
# encoding: utf-8
"""
@version: python3.7
@author: JYFelt
@license: Apache Licence 
@contact: JYFelt@163.com
@site: https://blog.csdn.net/weixin_38034182
@software: PyCharm
@file: forms.py
@time: 2019/2/2 0:00
"""
from flask_wtf import Form
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired, Length


class LoginForm(Form):
    username = StringField('明', validators=[DataRequired(), Length(1, 18)])
    password = PasswordField('暗', validators=[DataRequired()])
    remember_me = BooleanField('×功能未实现')
    submit = SubmitField('我准备好了！')
