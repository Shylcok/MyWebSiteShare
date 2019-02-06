#!/usr/bin/env python
# encoding: utf-8
"""
@version: python3.7
@author: JYFelt
@license: Apache Licence 
@contact: JYFelt@163.com
@site: https://blog.csdn.net/weixin_38034182
@software: PyCharm
@file: errors.py
@time: 2019/2/1 21:58
"""
from flask import render_template

from . import main, datetime


@main.app_errorhandler(404)
def page_not_found(e):
    return render_template('404.html',
                           current_time=datetime.utcnow()), 404


@main.app_errorhandler(505)
def internal_server_error(e):
    return render_template('505.html',
                           current_time=datetime.utcnow()), 505
