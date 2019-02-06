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
@time: 2019/2/1 23:37
"""
from flask import Blueprint
from datetime import datetime
auth = Blueprint('auth', __name__)

from . import views
