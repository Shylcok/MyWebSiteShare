#!/usr/bin/env python
# encoding: utf-8
"""
@version: python3.7
@author: JYFelt
@license: Apache Licence 
@contact: JYFelt@163.com
@site: https://blog.csdn.net/weixin_38034182
@software: PyCharm
@file: change.py
@time: 2019/2/2 17:54
"""
import random

random.seed = 1
file = 'app/static/files/b.txt'
with open(file, 'r', encoding='UTF8') as a:
    print(a.readlines()[random.randrange(0, 80)])
