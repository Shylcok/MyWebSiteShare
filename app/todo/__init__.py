#!/usr/bin/env python
# encoding: utf-8
"""
@version: python3.7
@author: JYFelt
@license: Apache Licence 
@contact: JYFelt@163.com
@site: https://blog.csdn.net/weixin_38034182
@software: PyCharm
@file: __init__.py.py
@time: 2019/2/2 19:50
"""
from flask import Blueprint
from datetime import datetime
todo = Blueprint('todo', __name__)

from . import views
