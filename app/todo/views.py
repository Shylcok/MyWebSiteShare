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
@time: 2019/2/5 20:52
"""
from flask import render_template, flash, redirect, request, url_for
from flask_login import login_required
from flask_login import current_user
from app import db
from . import todo, datetime
from .forms import AddEventForm, AddCategoryForm, EditEventForm
from ..models import Event, Category


@todo.route('/show/')
@login_required
def page_todo_show():
    """
    TODO页面
    :return:
    """
    events = Event.query.filter_by(sponsor_id=current_user.id).all()
    if events is None:
        flash('你还为创建任何事项')
    return render_template('show.html',
                           events=events,
                           current_time=datetime.utcnow()
                           )


@todo.route('/add-event/', methods=['GET', 'POST'])
@login_required
def add_event():
    """
    添加事件
    :return:
    """
    form = AddEventForm()

    if form.validate_on_submit():
        category = Category.query.filter_by(id=form.category.data).first()
        category = str(category)
        event = Event(
            title=form.title.data,
            category=category,
            sponsor=current_user._get_current_object()
        )
        db.session.add(event)
        flash('事件添加成功')
        return redirect(url_for('todo.page_todo_show'))
    return render_template('todo/add_event.html',
                           form=form,
                           current_time=datetime.utcnow())


@todo.route('/add-category/', methods=['GET', 'POST'])
@login_required
def add_category():
    """
    添加类别
    :return:
    """
    form = AddCategoryForm()
    if form.validate_on_submit():
        category = Category(name=form.name.data)
        db.session.add(category)
        flash('类别添加成功')
        return redirect(url_for('todo.page_todo_show'))
    return render_template('todo/add_category.html',
                           form=form,
                           current_time=datetime.utcnow())


@todo.route('/edit-event/<int:id>/', methods=['GET', 'POST'])
@login_required
def edit_event(id):
    """
    编辑
    :param id:
    :return:
    """
    event = Event.query.get_or_404(id)
    form = EditEventForm()
    if form.validate_on_submit():
        event.title = form.title.data
        event.category = Category.query.get(form.category.data).name
        db.session.add(event)
        flash('事件已经更新')
        return redirect(url_for('todo.page_todo_show'))
    form.title.data = event.title
    form.category.data = event.category
    return render_template('todo/edit_event.html',
                           form=form,
                           current_time=datetime.utcnow())


@todo.route('/delete-event/<int:id>/', methods=['GET', 'POST'])
@login_required
def delete_event(id):
    """
    删除
    :param id:
    :return:
    """
    event = Event.query.get_or_404(id)
    db.session.delete(event)
    db.session.commit()
    flash('事件已经删除')
    return redirect(url_for('todo.page_todo_show'))


@todo.route('/finish-event/<int:id>/')
@login_required
def finish(id):
    event = Event.query.get_or_404(id)
    if event:
        event.completion = True
        db.session.add(event)
        db.session.commit()
        flash('事件已经完成')
        return redirect(url_for('todo.page_todo_show'))
