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
@time: 2019/2/1 23:38
"""
from flask import render_template, redirect, request, url_for, flash, session
from flask_login import login_user, login_required, logout_user
from . import auth, datetime
from ..models import User
from .forms import LoginForm


@auth.route('/login/', methods=['POST', 'GET'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is not None and user.verify_password(form.password.data):
            login_user(user, form.remember_me.data)
            return redirect(request.args.get('next') or url_for('main.page_index'))
        flash('您输入的阴阳码不匹配哦！')
    return render_template('auth/login.html',
                           form=form,
                           current_time=datetime.utcnow()
                           )


@auth.route('/logout/')
@login_required
def logout():
    logout_user()
    flash('你已经回到现实世界啦！')
    return redirect(url_for('main.page_index'))
