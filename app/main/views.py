#!/usr/bin/env python
# encoding: utf-8
"""
@version: python3.7
@author: JYFelt
@license: Apache Licence 
@contact: JYFelt@163.com
@site: https://blog.csdn.net/weixin_38034182
@software: PyCharm
@file: views.py
@time: 2019/2/1 21:58
"""
from flask import render_template, jsonify, json
from . import main, datetime
from flask_login import login_required


@main.route('/')
def page_index():
    import random
    file = 'app/static/files/b.txt'
    with open(file, 'r', encoding='UTF8') as a:
        words = (a.readlines()[random.randrange(0, 80)])
    return render_template('index.html',
                           current_time=datetime.utcnow(),
                           words=words)


@main.route('/home/', methods=['POST', 'GET'])
def page_home():
    return render_template('home.html',
                           current_time=datetime.utcnow())


@main.route('/test/', methods=['POST', 'GET'])
@login_required
def page_test():
    a = 0
    if a == 1:
        row = [{'字段一': 'value1', '字段二': 'value2'}, {'字段一': 'value3', '字段二': 'value4'}]
        result = json.dumps(row)
        return result
    return render_template('test.html',
                           current_time=datetime.utcnow())


@main.route('/qcodethisisabadlink4thisdesign/', methods=['GET'])
def page_qcode():
    return render_template('qcode.html')
